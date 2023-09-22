import { ValueObject } from '../value-object';

interface DeliveryDataProps {
	endTime: string | null;
	typology: string | null;
	minutes: string | null;
}

export class ReportDeliveryData extends ValueObject<DeliveryDataProps> {
	constructor(value: DeliveryDataProps) {
		super(value);
	}

	protected validate(): void {}

	public getValue(): DeliveryDataProps {
		return this.value;
	}
}
