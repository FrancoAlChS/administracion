import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { RegisterAdministratorDTO } from '../domain/dto';
import { AdministratorRepository } from '../domain/repositories';
import { FindAllAdministrators, RegisterAdministrator } from '../domain/use-cases';

export class AdministratorController extends Controller {
	constructor(private readonly administratorRepository: AdministratorRepository) {
		super();
	}

	public listAdministrator = async (req: Request, res: Response) => {
		const listAdministrator = await new FindAllAdministrators(this.administratorRepository).execute();
		this.Ok(res, listAdministrator);
	};

	public createAdministrator = async (req: Request, res: Response) => {
		try {
			const administratorDTO = new RegisterAdministratorDTO(req.body);
			const administrator = await new RegisterAdministrator(this.administratorRepository).execute(
				administratorDTO
			);

			this.Ok(res, administrator);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
