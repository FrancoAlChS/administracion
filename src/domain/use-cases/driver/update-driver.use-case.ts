import { UpdateDriverDTO } from '../../dto';
import { DriverEntity } from '../../entities';
import { CustomError } from '../../errors';
import { AdministratorRepository, DriverRepository } from '../../repositories';
import { DriverAdministratorId, DriverEmail, DriverName } from '../../value-objects';

export class UpdateDriver {
	constructor(
		private readonly driverRepository: DriverRepository,
		private readonly administratorRepository: AdministratorRepository
	) {}

	public async execute(driverId: number, updateDriverDTO: UpdateDriverDTO): Promise<DriverEntity> {
		const driver = await this.driverRepository.findDriverById(driverId);
		let isModified = false;

		if (!driver) {
			throw CustomError.badRequest('No existe el conductor');
		}

		if (updateDriverDTO.name && updateDriverDTO.name !== driver.getName()) {
			const name = new DriverName(updateDriverDTO.name);
			await this.uniqueName(name);
			driver.name = name;
			isModified = true;
		}

		if (updateDriverDTO.email && updateDriverDTO.email !== driver.getEmail()) {
			const email = new DriverEmail(updateDriverDTO.email);
			driver.email = email;
			isModified = true;
		}

		if (updateDriverDTO.administratorId && updateDriverDTO.administratorId !== driver.getAdministratorId()) {
			const administratorId = new DriverAdministratorId(updateDriverDTO.administratorId);
			await this.existingAdministrator(administratorId);
			driver.administratorId = administratorId;
			isModified = true;
		}

		return isModified ? await this.driverRepository.updateDriver(driver) : driver;
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
