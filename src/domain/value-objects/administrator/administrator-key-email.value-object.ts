import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class AdministratorKeyEmail extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('La llavel del email no puede estar vacía');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('La llave del email debe ser un texto');
		}
	}

	public getValue(): string {
		return this.value;
	}
}
