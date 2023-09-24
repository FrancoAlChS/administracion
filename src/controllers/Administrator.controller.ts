import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { AdministratorRepository } from '../domain/repositories';
import { FindAllAdministrators, RegisterAdministrator } from '../domain/use-cases';
import { UpdateAdministrator } from '../domain/use-cases/administrator/update-administrator.use-case';

export class AdministratorController extends Controller {
	constructor(private readonly administratorRepository: AdministratorRepository) {
		super();
	}

	public listAdministrator = async (req: Request, res: Response) => {
		try {
			const listAdministrator = await new FindAllAdministrators(this.administratorRepository).execute();
			this.Ok(res, listAdministrator);
		} catch (error) {
			this.Error(res, error);
		}
	};

	public createAdministrator = async (req: Request, res: Response) => {
		try {
			const administrator = await new RegisterAdministrator(this.administratorRepository).execute(req.body);

			this.Ok(res, administrator);
		} catch (error) {
			this.Error(res, error);
		}
	};

	public updateAdministrator = async (req: Request, res: Response) => {
		try {
			const administratorId = Number(req.params.id);

			const administrator = await new UpdateAdministrator(this.administratorRepository).execute(
				administratorId,
				req.body
			);
			this.Ok(res, administrator);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
