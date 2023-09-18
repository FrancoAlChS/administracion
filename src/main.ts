import { Server } from './app/Server';
import { Enviroment } from './constants';

export const main = async () => {
	const app = new Server(Enviroment.SERVER_PORT);
	await app.start();
};
