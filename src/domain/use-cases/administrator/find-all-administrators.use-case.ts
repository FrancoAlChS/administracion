import { AdministratorEntity } from '../../entities';
import { AdministratorRepository } from '../../repositories';

interface FindAllAdministratorsUseCases {
	execute(): Promise<AdministratorEntity[]>;
}

export class FindAllAdministrators implements FindAllAdministratorsUseCases {
	constructor(private readonly administratorRepository: AdministratorRepository) {}

	public async execute(): Promise<AdministratorEntity[]> {
		const listAdministrators = await this.administratorRepository.findAllAdministrators();
		return listAdministrators;
	}
}
