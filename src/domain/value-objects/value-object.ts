import { CustomError } from '../errors';

export abstract class ValueObject<T> {
	constructor(protected value: T) {
		this.validate();
	}

	protected isEmpty(message: string) {
		if (this.value === undefined || this.value === '') {
			throw CustomError.badRequest(message);
		}
	}

	protected abstract validate(): void;

	public abstract getValue(): T;

	public update(value: T) {
		this.value = value;
		this.validate();
	}
}
