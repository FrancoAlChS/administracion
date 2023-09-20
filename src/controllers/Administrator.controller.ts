import { Request, Response } from 'express';
import { RegisterAdministratorDTO } from '../domain/dto';
import { AdministratorRepository } from '../domain/repositories';
import { FindAllAdministrators, RegisterAdministrator } from '../domain/use-cases';

export class AdministratorController {
	constructor(private readonly administratorRepository: AdministratorRepository) {}

	public listAdministrator = async (req: Request, res: Response) => {
		const listAdministrator = await new FindAllAdministrators(this.administratorRepository).execute();
		res.status(200).send(listAdministrator);
	};

	public createAdministrator = async (req: Request, res: Response) => {
		const administratorDTO = new RegisterAdministratorDTO(req.body);
		const administrator = await new RegisterAdministrator(this.administratorRepository).execute(
			administratorDTO
		);

		res.status(200).send(administrator);
	};
}
