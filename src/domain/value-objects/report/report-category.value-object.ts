import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

type Category = 'ingreso' | 'salida';

export class ReportCategory extends ValueObject<Category> {
	constructor(value: Category) {
		super(value.trim() as Category);
	}

	protected validate(): void {
		this.isEmpty('La categoria no puede estar vacia');

		if (this.value.toLowerCase() !== 'ingreso' && this.value.toLowerCase() !== 'salida') {
			throw CustomError.badRequest('La categoria solo puede ser "ingreso" o "salida"');
		}
	}

	public getValue(): Category {
		return this.value;
	}
}
