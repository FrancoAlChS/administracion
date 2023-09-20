import { RegisterAdministratorDTO } from '../../dto/administrator/register-administrator.dto';
import { AdministratorEntity } from '../../entities';
import { AdministratorRepository } from '../../repositories';

interface RegisterAdministratorUseCase {
	execute(dataRequest: RegisterAdministratorDTO): Promise<AdministratorEntity>;
}

export class RegisterAdministrator implements RegisterAdministratorUseCase {
	constructor(private readonly adminsitratorRepository: AdministratorRepository) {}

	public async execute(dataRequest: RegisterAdministratorDTO): Promise<AdministratorEntity> {
		const { name, email, keyEmail } = dataRequest.getData();
		const administrator = new AdministratorEntity(-1, name, email, keyEmail);

		const registeredAdministrator = await this.adminsitratorRepository.registerAdministrator(administrator);
		return registeredAdministrator;
	}
}
