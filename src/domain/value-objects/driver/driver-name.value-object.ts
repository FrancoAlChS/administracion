import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class DriverName extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El nombre no puede estar vacío');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('El nombre debe ser un texto');
		}

		if (this.value.length > 50 || this.value.length < 3) {
			throw CustomError.badRequest('El nombre debe tener entre 3 y 50 caracteres');
		}
	}

	public getValue(): string {
		return this.value;
	}
}
