import { Route } from '../app';
import { AdministratorController } from './../controllers';

export class AdministratorRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const administratorController = new AdministratorController();
		this.router.get('/administrator', administratorController.listAdministrator);
	}
}
