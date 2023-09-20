import { DriverEntity } from '../../entities';
import { DriverRepository } from '../../repositories';

interface UpdateDriverUseCase {
	execute(driver: DriverEntity): Promise<DriverEntity>;
}

export class UpdateDriver implements UpdateDriverUseCase {
	constructor(private readonly driverRepository: DriverRepository) {}

	public async execute(driver: DriverEntity): Promise<DriverEntity> {
		const registeredDriver = await this.driverRepository.updateDriver(driver);
		return registeredDriver;
	}
}
