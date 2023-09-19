import { Route } from '../app';
import { DriverController } from '../controllers';

export class DriverRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const driverController = new DriverController();
		this.router.get('/driver', driverController.listDrivers);
	}
}
