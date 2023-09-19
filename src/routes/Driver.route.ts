import { Route } from '../app';
import { DriverController } from '../controllers';

export class DriverRoute extends Route<DriverController> {
	constructor() {
		super(DriverController);
	}

	protected routes(): void {
		this.router.get('/driver', this.controller.listDrivers);
	}
}
