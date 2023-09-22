import { ValueObject } from '../value-object';

export class ReportDate extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('La fecha no puede estar vacia');
	}

	public getValue(): string {
		return this.value;
	}
}
