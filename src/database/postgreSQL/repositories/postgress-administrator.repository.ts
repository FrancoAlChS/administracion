import { AdministratorEntity } from '../../../domain/entities';
import { AdministratorRepository } from '../../../domain/repositories';
import { PostgresDatabase } from '../PostgresDatabase';
import { PostgressAdministratorModel } from '../models';

export class PostgressAdministratorRepository extends AdministratorRepository {
	private readonly datasource = PostgresDatabase.conecction().getRepository(PostgressAdministratorModel);

	constructor() {
		super();
	}

	public async findAllAdministrators(): Promise<AdministratorEntity[]> {
		const registeredAdministrators = await this.datasource.find();
		return registeredAdministrators;
	}

	public async findAdministratorById(id: number): Promise<AdministratorEntity | null> {
		const registeredAdministrator = await this.datasource.findOneBy({ id });
		return registeredAdministrator;
	}

	public async registerAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity> {
		const { name, email, keyEmail } = administrator;
		const preparedAdministrator = this.datasource.create({ name, email, keyEmail });
		const registeredAdministrator = await this.datasource.save(preparedAdministrator);

		return {
			...administrator,
			id: registeredAdministrator.id,
		};
	}
}
