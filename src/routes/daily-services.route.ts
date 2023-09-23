import { Route } from '../app';
import { dailyServicesController } from '../controllers';

import { PostgressAdministratorRepository } from '../database/postgreSQL/repositories';

export class DailyServicesRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const administratorRepository = new PostgressAdministratorRepository();

		const emailController = new dailyServicesController(administratorRepository);

		this.router.post('/sendDailyServices/GSS/:administratorId', emailController.sendDailyGSSServices);
		this.router.post('/sendDailyServices/MAJOREL/:administratorId', emailController.sendDailyMajorelServices);
	}
}
