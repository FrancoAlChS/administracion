import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { AdministratorRepository, DriverRepository } from '../domain/repositories';
import { FindAllDrivers, RegisterDriver, UpdateDriver } from '../domain/use-cases';

export class DriverController extends Controller {
	constructor(
		private readonly driverRepository: DriverRepository,
		private readonly administratorRepository: AdministratorRepository
	) {
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

	public registerDriver = async (req: Request, res: Response) => {
		try {
			const useCase = new RegisterDriver(this.driverRepository, this.administratorRepository);
			const driver = await useCase.execute(req.body);

			this.Ok(res, driver);
		} catch (error) {
			this.Error(res, error);
		}
	};

	public updateDriver = async (req: Request, res: Response) => {
		try {
			const driverId = Number(req.params.id);

			const useCase = new UpdateDriver(this.driverRepository, this.administratorRepository);
			const driver = await useCase.execute(driverId, req.body);

			this.Ok(res, driver);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
