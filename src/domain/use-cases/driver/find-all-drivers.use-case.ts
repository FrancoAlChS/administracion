import { DriverEntity } from '../../entities';
import { DriverRepository } from '../../repositories';

interface FindAllDriversUseCase {
	execute(): Promise<DriverEntity[]>;
}

export class FindAllDrivers implements FindAllDriversUseCase {
	constructor(private readonly driverRepository: DriverRepository) {}

	execute(): Promise<DriverEntity[]> {
		const listDrivers = this.driverRepository.findAllDrivers();
		return listDrivers;
	}
}
