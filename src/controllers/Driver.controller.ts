import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { DriverRepository } from '../domain/repositories';
import { FindAllDrivers } from '../domain/use-cases';

export class DriverController extends Controller {
	constructor(private readonly driverRepository: DriverRepository) {
		super();
	}

	public listDrivers = async (req: Request, res: Response) => {
		try {
			const listDrivers = await new FindAllDrivers(this.driverRepository).execute();
			this.Ok(res, listDrivers);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
