import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../value-objects';
import { Entity } from './Entity';

interface AdministratorProps {
	name: string;
	email: string;
	keyEmail: string;
}

export class AdministratorEntity extends Entity<AdministratorProps> {
	constructor(
		public readonly id: number,
		public name: AdministratorName,
		public email: AdministratorEmail,
		public keyEmail: AdministratorKeyEmail
	) {
		super();
	}

	public getValues(): AdministratorProps {
		return {
			name: this.name.getValue(),
			email: this.email.getValue(),
			keyEmail: this.keyEmail.getValue(),
		};
	}
}
