import fs from 'fs';
import path from 'path';
import fastify, { FastifyError, FastifyRequest } from 'fastify';
import AutoLoad from '@fastify/autoload';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';
import { BadRequestError, NotFoundError } from './app/utils';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { Emporio } from './Emporio';
import { StickerAppProductService } from './configuration/StickerAppProductService';

declare module 'fastify' {
	interface FastifyInstance {
		emporio: Emporio;
	}
}

async function buildServer() {
	const server = fastify({
		logger: getLoggerOptions(),
		disableRequestLogging: true,
	});

	const service = new StickerAppProductService();
	server.decorate("emporio", new Emporio(service));

	await server.register(swagger, {
		openapi: {
			info: {
				title: 'Emporio - the Commerce API',
				version: '1.0.0',
			},
			tags: [
				{ name: 'Price', description: 'Price related endpoints' },
				{ name: 'Product', description: 'Product related endpoints' },
				{ name: 'Production', description: 'Production related endpoints' },
				{ name: 'Other', description: 'Other endpoints' },
			],
		}
	});

	/**
	 * @see https://fastify.dev/docs/latest/Reference/Hooks/#onsend
	 * 
	 * This doesn't actually change the payload, but it does log the payload in a more readable format 
	 * */

	server.addHook('onRequest', (request, reply, done) => {
		server.log.debug({
			message: reply.statusCode + " - " + request.routeOptions.method + " " + request.routeOptions.url,
			url: request.url,
			query: parseQuery(request.query),
		});
		done()
	});

	await server.register(swaggerUi, {
		routePrefix: '/documentation',
	});

	server.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: {},
	});

	const appFolder = path.join(__dirname, 'app');
	for (const appFeature of fs.readdirSync(appFolder)) {
		const appFeatureRoutes = path.join(appFolder, appFeature, 'routes');
		if (fs.existsSync(appFeatureRoutes)) {
			server.register(AutoLoad, {
				dir: appFeatureRoutes,
				options: {
					prefix: appFeature,
					dirNameRoutePrefix: true,
				},
			});
		}
	}

	server.register(formbody);
	server.register(cors);
	server.setErrorHandler((error, request, reply) => {
		if (error instanceof TypeError || error.code === 'FST_ERR_VALIDATION') {
			server.log.warn(createErrorObject(error, request));
			reply.status(400).send({ message: error.message });
		} else if (error instanceof NotFoundError) {
			reply.status(404).send('Resource not found');
		} else if (error instanceof BadRequestError) {
			reply.status(400).send({ message: error.message });
		} else {
			server.log.error(createErrorObject(error, request));
			reply.status(500).send({ message: 'Internal server error' });
		}
	});

	server.get('/health-check', { schema: { tags: ['Other'] }}, async (request, reply) => {
		try {
			reply.status(200).send();
		} catch (e) {
			reply.status(500).send();
		}
	});

	if (process.env.NODE_ENV === 'production') {
		for (const signal of ['SIGINT', 'SIGTERM']) {
			process.on(signal, () =>
				server.close().then((err) => {
					console.log(`close application on ${signal}`);
					process.exit(err ? 1 : 0);
				}),
			);
		}
	}

	await server.ready();
	server.swagger();

	return server;
}

function createErrorObject(error: FastifyError, request: FastifyRequest) {
	return {
		message: error.message,
		url: request.url,
		query: parseQuery(request.query),
	};
}

// This function is used to parse interesting data from the query to use in the logger
function parseQuery(query: unknown){
	let regularObj = Object.assign({attributes: ""}, query);
	let result: Record<string, string> = {};

	try {
		result.attributes = JSON.parse(regularObj.attributes);
	} catch (e) {}

	return result;
}

function getLoggerOptions() {
	const logDir = path.join('/var/log/emporio/'); //TODO: make this configurable
	const logFile = path.join(logDir, 'api.log');

	let hasFileAccess = true;
	try{
		fs.accessSync(logDir, fs.constants.W_OK);
	} catch (e) {
		hasFileAccess = false;
	}

	// If the log directory exists and the process has access to it, use the file logger
	let useFileLogger = fs.existsSync(logDir) && hasFileAccess;

	if(useFileLogger) {
		return { 
			level: process.env.LOG_LEVEL || 'info', 
			formatters: {
				// This formatter makes the level output show as "info", rather than
				// the level number as specified in https://github.com/pinojs/pino/blob/main/docs/api.md#levels
				level: (label: string) => {
					return { level: label }
				}
			},	
			file: logFile
		};
	} else {
		console.log('Unable to write to log file, using console logger');
		return {
			level: process.env.LOG_LEVEL || 'info', 
		};
	}
}

export default buildServer;