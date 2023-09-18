import express from 'express';

export class Server {
	private readonly server = express();
	private readonly port: number;

	constructor(port: number) {
		this.port = port;
	}

	public async start() {
		await this.startServer();
	}

	private async startServer() {
		this.server.listen(this.port);
		console.log(`Servidor encendido en el puerto ${this.port}`);
		console.log(`http://localhost:${this.port}`);
	}
}
