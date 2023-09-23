import { Env } from '../utils';

export class Enviroment {
	public static SERVER_PORT = Env.getNumber('SERVER_PORT');
	public static DB_PORT = Env.getNumber('DB_PORT');
	public static DB_HOST = Env.getString('DB_HOST');
	public static DB_USER = Env.getString('DB_USER');
	public static DB_PASS = Env.getString('DB_PASS');
	public static DB_NAME = Env.getString('DB_NAME');
	public static EMAIL_PORT = Env.getNumber('EMAIL_PORT');
	public static EMAIL_HOST = Env.getString('EMAIL_HOST');
}
