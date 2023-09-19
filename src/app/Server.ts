import express from 'express';
import { Route } from './Route';

export class Server {
	private readonly server = express();
	private readonly port: number;
	private readonly routes: Route[];

	constructor(port: number, routes: Route[]) {
		this.routes = routes;
		this.port = port;
	}

	public async start() {
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
