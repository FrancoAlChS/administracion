import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

interface FromEmail {
	email: string;
	key: string;
}

export class EmailFromEmail extends ValueObject<FromEmail> {
	constructor(value: FromEmail) {
		super(value);
	}

	protected validate(): void {
		if (typeof this.value.email !== 'string') {
			throw CustomError.badRequest('El correo emisor debe ser una cadena');
		}

		if (typeof this.value.key !== 'string') {
			throw CustomError.badRequest('La llave del correo emisor debe ser una cadena');
		}

		const emailER =
			/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailER.test(this.value.email)) {
			throw CustomError.badRequest('El correo emisor debe tener un formato válido "(correo@correo.com)"');
		}
	}

	public getValue(): FromEmail {
		return this.value;
	}
}
