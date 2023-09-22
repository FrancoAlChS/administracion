import {
	ReportAgent,
	ReportCategory,
	ReportDate,
	ReportDeliveryData,
	ReportDriverName,
	ReportLocation,
	ReportSchedule,
	ReportVoucher,
} from '../value-objects';
import { Entity } from './Entity';

interface ReportProps {
	date: string;
	schedule: string;
	category: string;
	driverName: string;
	agent: {
		name: string;
		DNI: string | null;
	};
	address: string | null;
	district: string | null;
	reference: string | null;
	voucherNumber: string | null;
	endTime: string | null;
	typology: string | null;
	minutes: string | null;
}

export class ReportEntity extends Entity<ReportProps> {
	constructor(
		public date: ReportDate,
		public category: ReportCategory,
		public schedule: ReportSchedule,
		public driverName: ReportDriverName,
		public agent: ReportAgent,
		public location: ReportLocation,
		public voucher: ReportVoucher,
		public deliveryData: ReportDeliveryData
	) {
		super();
	}

	public getValues(): ReportProps {
		return {
			date: this.date.getValue(),
			schedule: this.schedule.getValue(),
			category: this.category.getValue(),
			driverName: this.driverName.getValue(),
			agent: this.agent.getValue(),
			address: this.location.getValue().address,
			district: this.location.getValue().district,
			reference: this.location.getValue().reference,
			voucherNumber: this.voucher.getValue(),
			endTime: this.deliveryData.getValue().endTime,
			typology: this.deliveryData.getValue().typology,
			minutes: this.deliveryData.getValue().minutes,
		};
	}
}
