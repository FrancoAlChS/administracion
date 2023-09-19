import { Request, Response } from 'express';
import { Controller } from '../app';

export class AdministratorController extends Controller {
	public listAdministrator = (req: Request, res: Response) => {
		res.send('Lista de administradores');
	};
}
