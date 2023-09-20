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
			DriverMapper.toDomain(
				driver.driver_id,
				driver.driver_name,
				driver.driver_email,
				driver.driver_administratorId
			)
		);
	}

	public async findDriverById(id: number): Promise<DriverEntity | null> {
		const registeredDriver = await this.datasource
			.createQueryBuilder('driver')
			.where('driver.id = :id', { id })
			.getRawOne();

		return DriverMapper.toDomain(
			registeredDriver.driver_id,
			registeredDriver.driver_name,
			registeredDriver.driver_email,
			registeredDriver.driver_administratorId
		);
	}

	public async registerDriver(driver: DriverEntity): Promise<DriverEntity> {
		const { email, administratorId, name } = driver;
		const preparedDriver = this.datasource.create({
			email: email.getValue(),
			administrator: { id: administratorId.getValue() },
			name: name.getValue(),
		});
		const registeredDriver = await this.datasource.save(preparedDriver);

		return {
			...driver,
			id: registeredDriver.id,
		};
	}

	public async updateDriver(driver: DriverEntity): Promise<DriverEntity> {
		const { id, email, administratorId, name } = driver;
		const result = await this.datasource.update(
			{ id },
			{
				name: name.getValue(),
				email: email.getValue(),
				administrator: { id: administratorId.getValue() },
			}
		);
		return driver;
	}
}
