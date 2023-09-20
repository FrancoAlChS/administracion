import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../value-objects';

export class AdministratorEntity {
	constructor(
		public readonly id: number,
		public name: AdministratorName,
		public email: AdministratorEmail,
		public keyEmail: AdministratorKeyEmail
	) {}
}
