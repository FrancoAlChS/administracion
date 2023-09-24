import { AdministratorEntity } from '../entities';

export abstract class AdministratorRepository {
	public abstract findAllAdministrators(): Promise<AdministratorEntity[]>;
	public abstract findAdministratorById(id: number): Promise<AdministratorEntity | null>;
	public abstract findAdministratorByName(name: string): Promise<AdministratorEntity | null>;
	public abstract findAdministratorByEmail(email: string): Promise<AdministratorEntity | null>;
	public abstract findAdministratorByKeEmail(keyEmail: string): Promise<AdministratorEntity | null>;
	public abstract registerAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity>;
	public abstract updateAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity>;
	public abstract findAdministratorAndHisDrivers(
		administratorId: number
	): Promise<AdministratorEntity | null>;
}
