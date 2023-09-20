import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class DriverEmail extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El correo no puede estar vacio');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('El correo debe ser una cadena');
		}

		const emailER =
			/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailER.test(this.value)) {
			throw CustomError.badRequest('El correo debe tener un formato válido "(correo@correo.com)"');
		}
	}

	public getValue(): string {
		return this.value;
	}
}
