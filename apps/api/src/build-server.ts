// import fs from 'fs';
// import path from 'path';
import fastify from 'fastify';
import pino from 'pino';
// import AutoLoad from '@fastify/autoload';
import formbody from '@fastify/formbody';
import cors from '@fastify/cors';
// import swagger from '@fastify/swagger';
// import swaggerUi from '@fastify/swagger-ui';
import { BadRequestError, NotFoundError } from '$app/utils';

async function buildServer() {
	const server = fastify({
		logger: pino({ level: process.env.LOG_LEVEL || 'info' }),
	});

	// await server.register(swagger, {});

	// await server.register(swaggerUi, {
	// 	routePrefix: '/documentation',
	// });

	// server.register(AutoLoad, {
	// 	dir: path.join(__dirname, 'plugins'),
	// 	options: {},
	// });

	// const appFolder = path.join(__dirname, 'app');
	// for (const appFeature of fs.readdirSync(appFolder)) {
	// 	const appFeatureRoutes = path.join(appFolder, appFeature, 'routes');
	// 	if (fs.existsSync(appFeatureRoutes)) {
	// 		server.register(AutoLoad, {
	// 			dir: appFeatureRoutes,
	// 			options: {
	// 				prefix: appFeature,
	// 				dirNameRoutePrefix: true,
	// 			},
	// 		});
	// 	}
	// }

	server.register(formbody);
	server.register(cors);
	server.setErrorHandler((error, request, reply) => {
		if (error.code === 'FST_ERR_VALIDATION') {
			reply.status(400).send(error.message);
		} else if (error instanceof NotFoundError) {
			reply.status(404).send('Resource not found');
		} else if (error instanceof BadRequestError) {
			reply.status(400).send(error.message);
		} else {
			server.log.error(error);
			reply.status(500).send('Internal server error');
		}
	});

	server.get('/health-check', async (request, reply) => {
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
	// server.swagger();

	return server;
}

export default buildServer;