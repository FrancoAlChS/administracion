import { DataSource } from 'typeorm';
import { Database } from '../../app';
import { Enviroment } from '../../constants';

export class PostgresDatabase extends Database {
	public static conecction() {
		return new DataSource({
			type: 'postgres',
			host: Enviroment.DB_HOST,
			port: Enviroment.DB_PORT,
			username: Enviroment.DB_USER,
			password: Enviroment.DB_PASS,
			database: Enviroment.DB_NAME,
			entities: [`${__dirname}/entities/*.{ts, js}`],
			migrations: [`${__dirname}/migrations/*.{ts,js}`],
		});
	}

	public async connect(): Promise<void> {
		try {
			await PostgresDatabase.conecction().initialize();
			console.log('Se realizo la conección con la base de dato');
		} catch (error) {
			console.log('Hubo un error con la conección a la base de datos');
			console.log(error);
		}
	}
}

export const database = PostgresDatabase.conecction();
