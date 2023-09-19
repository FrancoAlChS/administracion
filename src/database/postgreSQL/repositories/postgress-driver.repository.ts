import { DriverEntity } from '../../../domain/entities';
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
		return registeredDrivers.map((driver) => ({
			id: driver.driver_id,
			name: driver.driver_name,
			email: driver.driver_email,
			administratorId: driver.driver_administratorId,
		}));
	}

	public async findDriverById(id: number): Promise<DriverEntity | null> {
		const registeredDriver = await this.datasource
			.createQueryBuilder('driver')
			.where('driver.id = :id', { id })
			.getRawOne();

		return {
			id: registeredDriver.driver_id,
			name: registeredDriver.driver_name,
			email: registeredDriver.driver_email,
			administratorId: registeredDriver.driver_administratorId,
		};
	}

	public async registerDriver(driver: DriverEntity): Promise<DriverEntity> {
		const preparedDriver = this.datasource.create(driver);
		const registeredDriver = await this.datasource.save(preparedDriver);

		return {
			...driver,
			id: registeredDriver.id,
		};
	}
}
