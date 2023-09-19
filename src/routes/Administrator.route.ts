import { Route } from '../app';

export class AdministratorRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		this.router.get('/administrator', (req, res) => {
			res.send('SE ACCEDIO A LAS RUTAS DEL Administrator');
		});
	}
}
