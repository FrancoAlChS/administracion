import { DriverAdministratorId, DriverEmail, DriverName } from '../value-objects';
import { Entity } from './Entity';

interface DriverProps {
	id: number;
	name: string;
	email: string;
	administratorId: number;
}

export class DriverEntity extends Entity<DriverProps> {
	constructor(
		public readonly id: number,
		public name: DriverName,
		public email: DriverEmail,
		public administratorId: DriverAdministratorId
	) {
		super();
	}

	public getValues(): DriverProps {
		return {
			id: this.id,
			name: this.name.getValue(),
			email: this.email.getValue(),
			administratorId: this.administratorId.getValue(),
		};
	}
}
