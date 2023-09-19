import { Route } from '../app';

export class DriverRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		this.router.get('/driver', (req, res) => {
			res.send('SE ACCEDIO A LAS RUTAS DEL Conductor');
		});
	}
}
