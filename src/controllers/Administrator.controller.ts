import { Request, Response } from 'express';

export class AdministratorController {
	public listAdministrator = (req: Request, res: Response) => {
		res.send('Lista de administradores');
	};
}
