import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { RegisterDriverDTO, UpdateDriverDTO } from '../domain/dto';
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
			const driverEntity = await RegisterDriverDTO.execute(req.body);
			const driver = await new RegisterDriver(this.driverRepository).execute(driverEntity);

			this.Ok(res, driver);
		} catch (error) {
			this.Error(res, error);
		}
	};

	public updateDriver = async (req: Request, res: Response) => {
		try {
			const id = Number(req.params.id);
			const driverEntity = await UpdateDriverDTO.execute(
				id,
				req.body,
				this.driverRepository,
				this.administratorRepository
			);

			const driver = await new UpdateDriver(this.driverRepository).execute(driverEntity);

			this.Ok(res, driver);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
