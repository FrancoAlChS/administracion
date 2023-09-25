import { EmailEntity } from '../../entities';
import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';
import { EmailFrom, EmailFromEmail, EmailMessage, EmailSubject, EmailToEmail } from '../../value-objects';
import { SendEmailsAllDriversDto } from './../../dto';

type SendEmailFunction = (email: EmailEntity) => Promise<any>;

export class SendEmailsAllDrivers {
	constructor(
		private readonly administratorRepository: AdministratorRepository,
		private readonly sendEmail: SendEmailFunction
	) {}

	public async execute(administratorId: number, sendEmailsAllDriversDTO: SendEmailsAllDriversDto) {
		const administrator = await this.administratorRepository.findAdministratorAndHisDrivers(administratorId);
		if (!administrator) {
			throw CustomError.badRequest('No existe el administrador');
		}

		const subject = new EmailSubject(sendEmailsAllDriversDTO.subject);
		const message = new EmailMessage(sendEmailsAllDriversDTO.message);
		const fromEmail = new EmailFromEmail({
			email: administrator.getEmail(),
			key: administrator.getKeyEmail(),
		});
		const from = new EmailFrom(`${administrator.getName()} <${administrator.getEmail()}>`);

		const listEmails = administrator.getDrivers().map((driver) => {
			const toEmail = new EmailToEmail(driver.getEmail());
			return new EmailEntity(message, subject, toEmail, fromEmail, from);
		});

		await Promise.all(listEmails.map((email) => this.sendEmail(email)));
	}
}
