import { ValueObject } from '../value-object';

export class ReportDriverName extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El nombre del conductor no puede estar vacio');
	}

	public getValue(): string {
		return this.value;
	}
}
