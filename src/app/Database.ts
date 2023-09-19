export abstract class Database {
	public abstract connect(): Promise<void>;
}
