import { CustomError } from '../../errors';
import { AdministratorRepository, DriverRepository } from '../../repositories';

interface UpdateDriverRequest {
	name?: string;
	email?: string;
	administratorId?: number;
}

export class UpdateDriverDTO {
	public static async execute(
		id: number,
		dataRequest: UpdateDriverRequest,
		driverRepository: DriverRepository,
		administratorRepository: AdministratorRepository
	) {
		const registeredDriver = await driverRepository.findDriverById(id);

		if (!registeredDriver) {
			throw CustomError.badRequest('No existe el conductor indicado');
		}

		const { name, email, administratorId } = dataRequest;

		if (name) {
			registeredDriver.name.update(name);
		}

		if (email) {
			registeredDriver.email.update(email);
		}

		if (administratorId) {
			registeredDriver.administratorId.update(administratorId);
			const administratorRegistered = await administratorRepository.findAdministratorById(administratorId);
			if (!administratorRegistered) {
				throw CustomError.badRequest('No existe el administrador indicado');
			}
		}

		return registeredDriver;
	}
}
