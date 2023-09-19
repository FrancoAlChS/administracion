import express from 'express';
import { Database } from './Database';
import { Route } from './Route';

export class Server {
	private readonly server = express();
	private readonly port: number;
	private readonly routes: Route[];
	private readonly database: Database;

	constructor(port: number, routes: Route[], database: Database) {
		this.routes = routes;
		this.port = port;
		this.database = database;
	}

	public async start() {
		await this.database.connect();
		this.createRoutes();
		await this.startServer();
	}

	private async createRoutes() {
		this.routes.forEach((route) => this.server.use('/api', route.router));
	}

	private async startServer() {
		this.server.listen(this.port);
		console.log(`Servidor encendido en el puerto ${this.port}`);
		console.log(`http://localhost:${this.port}`);
	}
}
