import { Route } from '../app';
import { AdministratorController } from '../controllers';

export class AdministratorRoute extends Route<AdministratorController> {
	constructor() {
		super(AdministratorController);
	}

	protected routes(): void {
		this.router.get('/administrator', this.controller.listAdministrator);
	}
}
