import { ValueObject } from '../value-object';

export class ReportVoucher extends ValueObject<string> {
	constructor(value: string) {
		super(value);
	}

	protected validate(): void {}

	public getValue(): string {
		return this.value;
	}
}
