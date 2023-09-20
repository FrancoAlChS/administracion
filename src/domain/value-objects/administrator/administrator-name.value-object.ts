import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class AdministratorName extends ValueObject<string> {
	constructor(value: string) {
		super(value);
		this.validate();
	}

	protected validate() {
		this.isEmpty('El nombre es obligatorio');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('El nombre debe ser un texto');
		}

		if (this.value.length > 50 || this.value.length < 3) {
			throw CustomError.badRequest('El nombre debe tener entre 3 y 50 caracteres');
		}
	}

	public getValue() {
		return this.value;
	}
}
