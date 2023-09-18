import { Server } from './app/Server';

export const main = async () => {
	const app = new Server(4000);
	await app.start();
};
