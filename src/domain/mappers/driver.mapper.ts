import { DriverEntity } from '../entities';
import { DriverAdministratorId, DriverEmail, DriverName } from '../value-objects';

export class DriverMapper {
	public static toDomain(id: number, name: string, email: string, administratorId: number) {
		return new DriverEntity(
			id,
			new DriverName(name),
			new DriverEmail(email),
			new DriverAdministratorId(administratorId)
		);
	}
}
