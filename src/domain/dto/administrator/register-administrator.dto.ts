import { DTO } from '../dto';

interface RegisterAdministrator {
	name: string;
	email: string;
	keyEmail: string;
}

export class RegisterAdministratorDTO extends DTO<RegisterAdministrator> {
	constructor(dataRequest: RegisterAdministrator) {
		super(dataRequest);
	}

	protected validate() {
		if (!this.dataRequest.name) {
			throw new Error('El nombre es obligatorio');
		}

		if (!this.dataRequest.email) {
			throw new Error('El correo es obligatorio');
		}

		if (!this.dataRequest.keyEmail) {
			throw new Error('La llave del correo es obligatorio');
		}
	}

	public getData() {
		return {
			name: this.dataRequest.name,
			email: this.dataRequest.email,
			keyEmail: this.dataRequest.keyEmail,
		};
	}
}
