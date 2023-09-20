import { DriverEntity } from '../../entities';
import { DriverRepository } from '../../repositories';

export interface RegisterDriverUseCase {
	execute(driver: DriverEntity): Promise<DriverEntity>;
}

export class RegisterDriver implements RegisterDriverUseCase {
	constructor(private readonly driverRepository: DriverRepository) {}

	public async execute(driver: DriverEntity): Promise<DriverEntity> {
		const registeredDriver = await this.driverRepository.registerDriver(driver);
		return registeredDriver;
	}
}
