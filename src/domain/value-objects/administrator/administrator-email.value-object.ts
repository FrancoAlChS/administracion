import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class AdministratorEmail extends ValueObject<string> {
	constructor(value: string) {
		super(value);
		this.validate();
	}

	protected validate() {
		this.isEmpty('El email es obligatorio');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('El email debe ser una cadena');
		}

		const emailER =
			/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailER.test(this.value)) {
			throw CustomError.badRequest('El email debe tener un formato válido "(correo@correo.com)"');
		}
	}

	public getValue() {
		return this.value;
	}
}
