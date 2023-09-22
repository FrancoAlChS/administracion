import { AdministratorEntity } from '../../entities';
import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';

export class FindAdministratorAndHisDrivers {
	constructor(private readonly administratorRepository: AdministratorRepository) {}

	public async execute(administratorId: number): Promise<AdministratorEntity> {
		const administrator = await this.administratorRepository.findAdministratorAndHisDrivers(administratorId);
		if (!administrator) {
			throw CustomError.badRequest('No existe el administrador indicado');
		}

		return administrator;
	}
}
