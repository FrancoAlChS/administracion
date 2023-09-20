import { Route } from '../app';
import { DriverController } from '../controllers';
import { PostgressDriverRepository } from '../database/postgreSQL/repositories';

export class DriverRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const driverRepository = new PostgressDriverRepository();
		const driverController = new DriverController(driverRepository);

		this.router.get('/driver', driverController.listDrivers);
	}
}
