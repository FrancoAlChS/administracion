import { Request, Response } from 'express';

export class DriverController {
	public listDrivers = (req: Request, res: Response) => {
		res.send('Lista de conductores');
	};
}
