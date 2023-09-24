import { Request, Response } from 'express';
import { Controller } from '../app/Controller';

export class MessageEmailController extends Controller {
	constructor() {
		super();
	}

	public sendMessageAllDrivers = async (req: Request, res: Response) => {
		try {
			this.Ok(res);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
