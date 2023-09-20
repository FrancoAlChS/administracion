import { AdministratorEntity } from '../entities';
import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../value-objects';

export class AdministratorMapper {
	public static toDomain(data: { id: number; name: string; email: string; keyEmail: string }) {
		const { id, name, email, keyEmail } = data;

		return new AdministratorEntity(
			id,
			new AdministratorName(name),
			new AdministratorEmail(email),
			new AdministratorKeyEmail(keyEmail)
		);
	}
}
