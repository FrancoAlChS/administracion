import { Route } from '../app';
import { DriverController } from '../controllers';
import {
	PostgressAdministratorRepository,
	PostgressDriverRepository,
} from '../database/postgreSQL/repositories';

export class DriverRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const driverRepository = new PostgressDriverRepository();
		const administratorRepository = new PostgressAdministratorRepository();
		const driverController = new DriverController(driverRepository, administratorRepository);

		this.router.get('/driver', driverController.listDrivers);
		this.router.post('/driver', driverController.registerDriver);
		this.router.put('/driver/:id', driverController.updateDriver);
	}
}
