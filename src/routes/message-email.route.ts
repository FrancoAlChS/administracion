import { Route } from '../app';
import { MessageEmailController } from '../controllers';
import { PostgressAdministratorRepository } from '../database/postgreSQL/repositories';

export class MessageEmailRoute extends Route {
	constructor() {
		super();
	}

	protected routes(): void {
		const administratorRepository = new PostgressAdministratorRepository();
		const messageEmailController = new MessageEmailController(administratorRepository);

		this.router.post('/message/allDrivers/:administratorId', messageEmailController.sendMessageAllDrivers);
	}
}
