import { DriverAdministratorId, DriverEmail, DriverName } from '../value-objects';

export class DriverEntity {
	constructor(
		public readonly id: number,
		public name: DriverName,
		public email: DriverEmail,
		public administratorId: DriverAdministratorId
	) {}
}
