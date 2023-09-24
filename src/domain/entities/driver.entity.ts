import { CustomError } from '../errors';
import { DriverAdministratorId, DriverEmail, DriverName } from '../value-objects';
import { Entity } from './Entity';
import { AdministratorEntity } from './administrator.entity';

interface DriverProps {
	id: number;
	name: string;
	email: string;
	administratorId: number;
}

export class DriverEntity extends Entity<DriverProps> {
	private administrator: AdministratorEntity | undefined = undefined;

	constructor(
		public readonly id: number,
		public name: DriverName,
		public email: DriverEmail,
		public administratorId: DriverAdministratorId
	) {
		super();
	}

	public getValues(): DriverProps {
		return {
			id: this.id,
			name: this.name.getValue(),
			email: this.email.getValue(),
			administratorId: this.administratorId.getValue(),
		};
	}

	public getName(): string {
		return this.name.getValue();
	}

	public getEmail(): string {
		return this.email.getValue();
	}

	public getAdministratorId(): number {
		return this.administratorId.getValue();
	}

	public setAdministrator(administrator: AdministratorEntity) {
		this.administrator = administrator;
	}

	public getAdministrator() {
		if (this.administrator === undefined) {
			throw CustomError.internalServer('No se asigno el administrador a la entidad');
		}
		return this.administrator;
	}
}
