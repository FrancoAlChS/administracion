import { AdministratorEntity } from '../../entities';
import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../../value-objects';

interface RegisterAdministrator {
	name: string;
	email: string;
	keyEmail: string;
}

export class RegisterAdministratorDTO {
	public static async create(dataRequest: RegisterAdministrator): Promise<AdministratorEntity> {
		const name = new AdministratorName(dataRequest.name);
		const email = new AdministratorEmail(dataRequest.email);
		const keyEmail = new AdministratorKeyEmail(dataRequest.keyEmail);

		return new AdministratorEntity(0, name, email, keyEmail);
	}
}
