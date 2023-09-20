import { Response } from 'express';
import { CustomError } from '../domain/errors';

export abstract class Controller {
	protected Ok(res: Response, data?: any) {
		res.status(200).json({ type: 'SUCCESS', data });
	}

	protected Error(res: Response, error: unknown) {
		if (error instanceof CustomError) {
			res.status(error.code).json({ type: 'ERROR', error: error.message });
			return;
		}

		console.log(error);
		res.status(500).send({ type: 'ERROR', error: '¡HUBO UN ERROR EN EL SERVIDOR!' });
	}
}
