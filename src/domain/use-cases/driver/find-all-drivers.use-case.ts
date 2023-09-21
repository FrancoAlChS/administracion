import { DriverEntity } from '../../entities';
import { DriverRepository } from '../../repositories';

interface FindAllDriversUseCase {
	execute(): Promise<DriverEntity[]>;
}

export class FindAllDrivers implements FindAllDriversUseCase {
	constructor(private readonly driverRepository: DriverRepository) {}

	public async execute(): Promise<DriverEntity[]> {
		const listDrivers = await this.driverRepository.findAllDrivers();
		return listDrivers;
	}
}
