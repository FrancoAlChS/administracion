import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

export class EmailFrom extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El nombre del emisor no puede estar vacío');

		if (typeof this.value !== 'string') {
			throw CustomError.badRequest('El nombre del emisor tiene que ser un texto');
		}
	}

	public getValue(): string {
		return this.value;
	}
}
