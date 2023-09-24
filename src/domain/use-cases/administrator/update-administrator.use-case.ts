import { UpdateAdministratorDTO } from '../../dto';
import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';
import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../../value-objects';

export class UpdateAdministrator {
	constructor(private readonly administratorRepository: AdministratorRepository) {}

	public async execute(administratorId: number, updateAdministratorDTO: UpdateAdministratorDTO) {
		const administrator = await this.administratorRepository.findAdministratorById(administratorId);
		let isModified = false;

		if (!administrator) {
			throw CustomError.badRequest('No existe el administrador');
		}

		if (updateAdministratorDTO.name && updateAdministratorDTO.name !== administrator.name.getValue()) {
			const name = new AdministratorName(updateAdministratorDTO.name);
			await this.uniqueName(name);
			administrator.name = name;
			isModified = true;
		}

		if (updateAdministratorDTO.email && updateAdministratorDTO.email !== administrator.email.getValue()) {
			const email = new AdministratorEmail(updateAdministratorDTO.email);
			await this.uniqueEmail(email);
			administrator.email = email;
			isModified = true;
		}

		if (
			updateAdministratorDTO.keyEmail &&
			updateAdministratorDTO.keyEmail !== administrator.keyEmail.getValue()
		) {
			const keyEmail = new AdministratorKeyEmail(updateAdministratorDTO.keyEmail);
			await this.uniqueKeyEmail(keyEmail);
			administrator.keyEmail = keyEmail;
			isModified = true;
		}

		return isModified ? await this.administratorRepository.updateAdministrator(administrator) : administrator;
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
