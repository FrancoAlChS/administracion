import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { AdministratorRepository } from '../domain/repositories';
import { SendEmailsAllDrivers } from '../domain/use-cases';
import { Email } from '../utils';

export class MessageEmailController extends Controller {
	constructor(private readonly administratorRepository: AdministratorRepository) {
		super();
	}

	public sendMessageAllDrivers = async (req: Request, res: Response) => {
		try {
			const administratorId = Number(req.params.administratorId);
			const useCase = new SendEmailsAllDrivers(this.administratorRepository, Email.sendEmail);
			await useCase.execute(administratorId, req.body);
			this.Ok(res);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
