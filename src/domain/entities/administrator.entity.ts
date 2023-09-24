import { CustomError } from '../errors';
import { AdministratorEmail, AdministratorKeyEmail, AdministratorName } from '../value-objects';
import { Entity } from './Entity';
import { DriverEntity } from './driver.entity';

interface AdministratorProps {
	name: string;
	email: string;
	keyEmail: string;
}

export class AdministratorEntity extends Entity<AdministratorProps> {
	private drivers: DriverEntity[] | null = [];

	constructor(
		public readonly id: number,
		public name: AdministratorName,
		public email: AdministratorEmail,
		public keyEmail: AdministratorKeyEmail
	) {
		super();
	}

	public setDrivers(drivers: DriverEntity[]): void {
		this.drivers = drivers;
	}

	public getDrivers(): DriverEntity[] {
		if (this.drivers === null) {
			throw CustomError.internalServer('No se asignaron los conductores a la entidad');
		}
		return this.drivers;
	}

	public getValues(): AdministratorProps {
		return {
			name: this.name.getValue(),
			email: this.email.getValue(),
			keyEmail: this.keyEmail.getValue(),
		};
	}

	public getName(): string {
		return this.name.getValue();
	}

	public getEmail(): string {
		return this.email.getValue();
	}
	public getKeyEmail(): string {
		return this.keyEmail.getValue();
	}
}
