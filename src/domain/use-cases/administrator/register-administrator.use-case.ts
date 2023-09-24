import { RegisterAdministratorDTO } from '../../dto';
import { AdministratorEntity } from '../../entities';
import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';
import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../../value-objects';

export class RegisterAdministrator {
	constructor(private readonly administratorRepository: AdministratorRepository) {}

	public async execute(registerAdministratorDTO: RegisterAdministratorDTO): Promise<AdministratorEntity> {
		const name = new AdministratorName(registerAdministratorDTO.name);
		const email = new AdministratorEmail(registerAdministratorDTO.email);
		const keyEmail = new AdministratorKeyEmail(registerAdministratorDTO.keyEmail);

		await this.uniqueName(name);
		await this.uniqueEmail(email);
		await this.uniqueKeyEmail(keyEmail);

		const administrator = new AdministratorEntity(0, name, email, keyEmail);
		const registeredAdministrator = await this.administratorRepository.registerAdministrator(administrator);
		return registeredAdministrator;
	}

	private async uniqueName(name: AdministratorName) {
		const administrator = await this.administratorRepository.findAdministratorByName(name.getValue());
		if (administrator) {
			throw CustomError.badRequest('Ya existe un administrador con este nombre');
		}
	}

	private async uniqueEmail(email: AdministratorEmail) {
		const administrator = await this.administratorRepository.findAdministratorByEmail(email.getValue());
		if (administrator) {
			throw CustomError.badRequest('Ya existe un administrador con este email');
		}
	}

	private async uniqueKeyEmail(keyEmail: AdministratorKeyEmail) {
		const administrator = await this.administratorRepository.findAdministratorByKeEmail(keyEmail.getValue());
		if (administrator) {
			throw CustomError.badRequest('Ya existe un administrador con esta llave de email');
		}
	}
}
