import { Route } from '../app';
import { AdministratorController } from '../controllers';
import { PostgressAdministratorRepository } from '../database/postgreSQL/repositories';

export class AdministratorRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const administratorRepository = new PostgressAdministratorRepository();
		const administratorController = new AdministratorController(administratorRepository);

		this.router.get('/administrator', administratorController.listAdministrator);
		this.router.post('/administrator', administratorController.createAdministrator);
		this.router.put('/administrator/:id', administratorController.updateAdministrator);
	}
}
