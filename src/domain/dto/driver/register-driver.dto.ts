import { DriverEntity } from '../../entities';
import { DriverAdministratorId, DriverEmail, DriverName } from '../../value-objects';

interface RegisterDriverRequest {
	name: string;
	email: string;
	administratorId: number;
}

export class RegisterDriverDTO {
	public static async execute(dataRequest: RegisterDriverRequest) {
		const name = new DriverName(dataRequest.name);
		const email = new DriverEmail(dataRequest.email);
		const administrator = new DriverAdministratorId(dataRequest.administratorId);

		return new DriverEntity(-1, name, email, administrator);
	}
}
