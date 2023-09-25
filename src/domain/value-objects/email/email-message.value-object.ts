import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class EmailMessage extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El mensaje del correo no puede estar vacío');

		if (this.value.length < 10) {
			throw CustomError.badRequest('El mensaje del correo deber tener más de 10 carácteres');
		}
	}

	public getValue(): string {
		return this.value;
	}
}
