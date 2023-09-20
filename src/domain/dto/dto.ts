export abstract class DTO<T> {
	constructor(protected readonly dataRequest: T) {
		this.validate();
	}

	protected abstract validate(): void;
}
