import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class EmailSubject extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El asunto del correo no puede estar vacío');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('El asunto del correo debe ser un texto');
		}

		if (this.value.length < 3) {
			throw CustomError.badRequest('El asunto del correo debe tener más de 3 carácteres');
		}
	}

	public getValue(): string {
		return this.value;
	}
}
