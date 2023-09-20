import { AdministratorEntity } from '../../entities';
import { AdministratorRepository } from '../../repositories';

interface RegisterAdministratorUseCase {
	execute(administrator: AdministratorEntity): Promise<AdministratorEntity>;
}

export class RegisterAdministrator implements RegisterAdministratorUseCase {
	constructor(private readonly adminsitratorRepository: AdministratorRepository) {}

	public async execute(administrator: AdministratorEntity): Promise<AdministratorEntity> {
		const registeredAdministrator = await this.adminsitratorRepository.registerAdministrator(administrator);
		return registeredAdministrator;
	}
}
