import { Server } from './app/Server';
import { Enviroment } from './constants';
import { Routes } from './routes';

export const main = async () => {
	const app = new Server(Enviroment.SERVER_PORT, Routes);
	await app.start();
};
