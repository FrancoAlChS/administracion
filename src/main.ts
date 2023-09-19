import { Server } from './app/Server';
import { Enviroment } from './constants';
import { PostgresDatabase } from './database/postgreSQL/PostgresDatabase';
import { Routes } from './routes';

export const main = async () => {
	const postgresDatabase = new PostgresDatabase();
	const app = new Server(Enviroment.SERVER_PORT, Routes, postgresDatabase);
	await app.start();
};
