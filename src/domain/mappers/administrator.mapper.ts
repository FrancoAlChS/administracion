import { AdministratorEntity } from '../entities';
import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../value-objects';
import { DriverMapper } from './driver.mapper';

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

	public static toDomainAndDrivers(
		administrator: {
			id: number;
			name: string;
			email: string;
			keyEmail: string;
		},
		drivers: { id: number; name: string; email: string }[]
	) {
		const administratorEntity = AdministratorMapper.toDomain(administrator);

		const driversEntity = drivers.map((driver) =>
			DriverMapper.toDomain({
				id: driver.id,
				name: driver.name,
				email: driver.email,
				administratorId: administratorEntity.id,
			})
		);

		administratorEntity.setDrivers(driversEntity);
		return administratorEntity;
	}
}
