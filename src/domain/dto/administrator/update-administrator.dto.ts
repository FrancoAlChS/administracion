import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';

interface UpdateAdministratorRequest {
	name?: string;
	email?: string;
	keyEmail?: string;
}

export class UpdateAdministratorDTO {
	public static async execute(
		id: number,
		dataRequest: UpdateAdministratorRequest,
		administratorRepository: AdministratorRepository
	) {
		const registeredAministrator = await administratorRepository.findAdministratorById(id);
		if (!registeredAministrator) {
			throw CustomError.badRequest('El administrador indicado no existe');
		}

		if (dataRequest.name) {
			registeredAministrator.name.update(dataRequest.name);
		}

		if (dataRequest.email) {
			registeredAministrator.email.update(dataRequest.email);
		}

		if (dataRequest.keyEmail) {
			registeredAministrator.keyEmail.update(dataRequest.keyEmail);
		}

		return registeredAministrator;
	}
}
