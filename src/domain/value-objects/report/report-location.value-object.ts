import { ValueObject } from '../value-object';

interface LocationProps {
	reference: string | null;
	address: string | null;
	district: string | null;
}

export class ReportLocation extends ValueObject<LocationProps> {
	constructor(value: LocationProps) {
		super(value);
	}

	protected validate(): void {}

	public getValue(): LocationProps {
		return this.value;
	}
}
