import { AdministratorEntity } from '../../../domain/entities';
import { AdministratorMapper } from '../../../domain/mappers';
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
		return registeredAdministrators.map((administrator) => AdministratorMapper.toDomain(administrator));
	}

	public async findAdministratorById(id: number): Promise<AdministratorEntity | null> {
		const administrator = await this.datasource.findOneBy({ id });
		return administrator && AdministratorMapper.toDomain(administrator);
	}

	public async registerAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity> {
		const { name, email, keyEmail } = administrator.getValues();

		const preparedAdministrator = this.datasource.create({ name, email, keyEmail });
		const registeredAdministrator = await this.datasource.save(preparedAdministrator);

		return AdministratorMapper.toDomain(registeredAdministrator);
	}

	public async updateAdministrator(administrator: AdministratorEntity): Promise<AdministratorEntity> {
		const { name, email, keyEmail } = administrator.getValues();
		await this.datasource.update({ id: administrator.id }, { name, email, keyEmail });

		return administrator;
	}
}
