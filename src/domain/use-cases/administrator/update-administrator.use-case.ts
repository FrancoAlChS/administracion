import { AdministratorEntity } from '../../entities';
import { AdministratorRepository } from '../../repositories';

interface UpdateAdministratorUseCase {
	execute(administrator: AdministratorEntity): Promise<AdministratorEntity>;
}

export class UpdateAdministrator implements UpdateAdministratorUseCase {
	constructor(private readonly administratorRepository: AdministratorRepository) {}

	public async execute(administrator: AdministratorEntity): Promise<AdministratorEntity> {
		const registeredAdministrator = await this.administratorRepository.updateAdministrator(administrator);
		return registeredAdministrator;
	}
}
