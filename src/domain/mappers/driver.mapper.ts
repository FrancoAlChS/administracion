import { DriverEntity } from '../entities';
import { DriverAdministratorId, DriverEmail, DriverName } from '../value-objects';

export class DriverMapper {
	public static toDomain(data: { id: number; name: string; email: string; administratorId: number }) {
		const { id, name, email, administratorId } = data;
		return new DriverEntity(
			id,
			new DriverName(name),
			new DriverEmail(email),
			new DriverAdministratorId(administratorId)
		);
	}
}
