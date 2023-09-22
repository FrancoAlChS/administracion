import { ValueObject } from '../value-object';

export class ReportCampus extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('La sede no puede estar vacia');
	}

	public getValue(): string {
		return this.value;
	}
}
