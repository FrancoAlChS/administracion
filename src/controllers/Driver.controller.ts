import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { RegisterDriverDTO } from '../domain/dto';
import { DriverRepository } from '../domain/repositories';
import { FindAllDrivers, RegisterDriver } from '../domain/use-cases';

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

	public registerDriver = async (req: Request, res: Response) => {
		try {
			const driverEntity = await RegisterDriverDTO.execute(req.body);
			const driver = await new RegisterDriver(this.driverRepository).execute(driverEntity);

			this.Ok(res, driver);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
