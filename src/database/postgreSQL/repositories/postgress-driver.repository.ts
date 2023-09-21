import { DriverEntity } from '../../../domain/entities';
import { DriverMapper } from '../../../domain/mappers';
import { DriverRepository } from '../../../domain/repositories';
import { PostgresDatabase } from '../PostgresDatabase';
import { PostgressDriverModel } from '../models';

export class PostgressDriverRepository extends DriverRepository {
	private readonly datasource = PostgresDatabase.conecction().getRepository(PostgressDriverModel);

	constructor() {
		super();
	}

	public async findAllDrivers(): Promise<DriverEntity[]> {
		const registeredDrivers = await this.datasource.createQueryBuilder('driver').getRawMany();
		return registeredDrivers.map((driver) =>
			DriverMapper.toDomain({
				id: driver.driver_id,
				name: driver.driver_name,
				email: driver.driver_email,
				administratorId: driver.driver_administratorId,
			})
		);
	}

	public async findDriverById(id: number): Promise<DriverEntity | null> {
		const registeredDriver = await this.datasource
			.createQueryBuilder('driver')
			.where('driver.id = :id', { id })
			.getRawOne();

		return DriverMapper.toDomain({
			id: registeredDriver.driver_id,
			name: registeredDriver.driver_name,
			email: registeredDriver.driver_email,
			administratorId: registeredDriver.driver_administratorId,
		});
	}

	public async registerDriver(driver: DriverEntity): Promise<DriverEntity> {
		const { email, administratorId, name } = driver.getValues();
		const preparedDriver = this.datasource.create({ email, name, administrator: { id: administratorId } });
		const registeredDriver = await this.datasource.save(preparedDriver);

		return DriverMapper.toDomain({ id: registeredDriver.id, name, administratorId, email });
	}

	public async updateDriver(driver: DriverEntity): Promise<DriverEntity> {
		const { id, email, administratorId, name } = driver.getValues();
		await this.datasource.update({ id }, { name, email, administrator: { id: administratorId } });

		return driver;
	}
}
