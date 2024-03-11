// Pass --options via CLI arguments in command to enable these options.
import buildServer from './build-server';
export const options = {};

export default async function app() {
	const port = Number(process.env.API_PORT ?? '5000');

	process.on('unhandledRejection', (e) => {
		console.error(e);
	});

	const server = await buildServer();
	await server.ready();
	// server.swagger();
	await server.listen({
		port,
	});
}

app();