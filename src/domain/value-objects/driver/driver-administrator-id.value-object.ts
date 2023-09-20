import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class DriverAdministratorId extends ValueObject<number> {
	constructor(value: number) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El administrador no puede estar vacio');

		if (typeof this.value !== 'number' || this.value < 1) {
			throw CustomError.badRequest('Se debe ingresar un administrador válido');
		}
	}

	public getValue(): number {
		return this.value;
	}
}
