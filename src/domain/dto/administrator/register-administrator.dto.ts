import { CustomError } from '../../errors';
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
			throw CustomError.badRequest('El nombre es obligatorio');
		}

		if (!this.dataRequest.email) {
			throw CustomError.badRequest('El correo es obligatorio');
		}

		if (!this.dataRequest.keyEmail) {
			throw CustomError.badRequest('La llave del correo es obligatorio');
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
