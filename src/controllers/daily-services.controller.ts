import { Request, Response } from 'express';
import { Controller } from '../app/Controller';
import { ReportTypes } from '../domain/constants';
import { SendDailyServicesDTO } from '../domain/dto';
import { AdministratorRepository } from '../domain/repositories';
import { SendDailyServices } from '../domain/use-cases';
import { Email, Excel } from '../utils';

export class dailyServicesController extends Controller {
	constructor(private readonly administratorRepository: AdministratorRepository) {
		super();
	}

	public sendDailyGSSServices = async (req: Request, res: Response) => {
		try {
			const administratorId = Number(req.params.administratorId);
			const sendDailyServicesDTO = SendDailyServicesDTO.create(req.body, ReportTypes.GSS);

			await new SendDailyServices(this.administratorRepository, Excel.readExcel, Email.sendEmail).execute(
				administratorId,
				sendDailyServicesDTO
			);
			this.Ok(res);
		} catch (error) {
			this.Error(res, error);
		}
	};

	public sendDailyMajorelServices = async (req: Request, res: Response) => {
		try {
			const administratorId = Number(req.params.administratorId);
			const sendDailyServicesDTO = SendDailyServicesDTO.create(req.body, ReportTypes.MAJOREL);

			await new SendDailyServices(this.administratorRepository, Excel.readExcel, Email.sendEmail).execute(
				administratorId,
				sendDailyServicesDTO
			);
			this.Ok(res);
		} catch (error) {
			this.Error(res, error);
		}
	};
}
