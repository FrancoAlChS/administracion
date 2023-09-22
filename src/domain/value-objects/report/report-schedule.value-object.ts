import { ValueObject } from '../value-object';

export class ReportSchedule extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {
		this.isEmpty('El horario no puede estar vacio');
	}

	public getValue(): string {
		return this.value;
	}
}
