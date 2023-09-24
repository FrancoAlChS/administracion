import { RegisterDriverDTO } from '../../dto';
import { DriverEntity } from '../../entities';
import { CustomError } from '../../errors';
import { AdministratorRepository, DriverRepository } from '../../repositories';
import { DriverAdministratorId, DriverEmail, DriverName } from '../../value-objects';

export class RegisterDriver {
	constructor(
		private readonly driverRepository: DriverRepository,
		private readonly administratorRepository: AdministratorRepository
	) {}

	public async execute(registerDriverDTO: RegisterDriverDTO): Promise<DriverEntity> {
		const name = new DriverName(registerDriverDTO.name);
		const email = new DriverEmail(registerDriverDTO.email);
		const administratorId = new DriverAdministratorId(registerDriverDTO.administratorId);

		await this.uniqueName(name);
		await this.existingAdministrator(administratorId);

		const driver = new DriverEntity(0, name, email, administratorId);

		const registeredDriver = await this.driverRepository.registerDriver(driver);
		return registeredDriver;
	}

	private async uniqueName(name: DriverName) {
		const driver = await this.driverRepository.findDriverByName(name.getValue());
		if (driver) {
			throw CustomError.badRequest('Ya existe un conductor con este nombre');
		}
	}

	private async existingAdministrator(administratorId: DriverAdministratorId) {
		const administrator = await this.administratorRepository.findAdministratorById(
			administratorId.getValue()
		);
		if (!administrator) {
			throw CustomError.badRequest('No existe el administrador');
		}
	}
}
