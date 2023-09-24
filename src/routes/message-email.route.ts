import { Route } from '../app';
import { MessageEmailController } from '../controllers';

export class MessageEmailRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const messageEmailController = new MessageEmailController();
		this.router.post('/message/allDrivers', messageEmailController.sendMessageAllDrivers);
	}
}
