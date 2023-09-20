import { AdministratorEntity } from '../entities';

export abstract class AdministratorRepository {
	public abstract findAllAdministrators(): Promise<AdministratorEntity[]>;
	public abstract findAdministratorById(id: number): Promise<AdministratorEntity | null>;
	public abstract registerAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity>;
	public abstract updateAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity>;
}
