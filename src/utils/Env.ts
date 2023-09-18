import dotenv from 'dotenv';

dotenv.config();

export class Env {
	public static getString(key: string): string {
		const value = process.env[key];
		if (!value) {
			throw new Error(`No existe este valor ${key}`);
		}

		return value;
	}

	public static getNumber(key: string): number {
		const value = Env.getString(key);
		return Number(value);
	}
}
