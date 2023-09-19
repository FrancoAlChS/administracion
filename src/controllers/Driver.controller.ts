import { Request, Response } from 'express';
import { Controller } from '../app/Controller';

export class DriverController extends Controller {
	public listDrivers = (req: Request, res: Response) => {
		res.send('Lista de conductores');
	};
}
