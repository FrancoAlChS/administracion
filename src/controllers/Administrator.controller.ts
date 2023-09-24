import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { UpdateAdministratorDTO } from '../domain/dto';
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
			const id = Number(req.params.id);
			const administratorEntity = await UpdateAdministratorDTO.execute(
				id,
				req.body,
				this.administratorRepository
			);
			const administrator = await new UpdateAdministrator(this.administratorRepository).execute(
				administratorEntity
			);
			this.Ok(res, administrator);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
