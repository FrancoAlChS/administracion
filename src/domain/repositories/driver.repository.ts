import { DriverEntity } from '../entities';

export abstract class DriverRepository {
	public abstract findAllDrivers(): Promise<DriverEntity[]>;
	public abstract findDriverById(id: number): Promise<DriverEntity | null>;
	public abstract registerDriver(driver: DriverEntity): Promise<DriverEntity>;
	public abstract updateDriver(driver: DriverEntity): Promise<DriverEntity>;
}
