import { SendDailyServicesDTO } from '../../dto';
import { EmailEntity } from '../../entities';
import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';
import { EmailFrom, EmailFromEmail, EmailMessage, EmailSubject, EmailToEmail } from '../../value-objects';
import { CreateDailyServicesMessage } from './create-daily-services-message.use-case';
import { ReadExcelDailyServicesGSS } from './read-excel-daily-services-gss.use-case';
import { ReadExcelDailyServicesMajorel } from './read-excel-daily-services-majorel.use-case';

type ReadExcelFunction = (directory: string) => Promise<any>;
type SendEmailFunction = (email: EmailEntity) => Promise<any>;

export class SendDailyServices {
	constructor(
		private readonly administratorRepository: AdministratorRepository,
		private readonly readExcel: ReadExcelFunction,
		private readonly sendEmail: SendEmailFunction
	) {}

	public async execute(administratorId: number, options: SendDailyServicesDTO) {
		const administrator = await this.administratorRepository.findAdministratorAndHisDrivers(administratorId);
		if (!administrator) {
			throw CustomError.badRequest('No existe el administrador');
		}

		const { day, excelFileName, reportType } = options;
		const { email, keyEmail, name } = administrator.getValues();

		const listDrivers = administrator.getDrivers();

		//- SEPARAR LOS REPORTES EN LAS LISTAS DE LOS CONDUCTORES DEL ADMINISTRADOR, SEGÚN EL TIPO DE REPORTE
		const reportsByDriver = await (options.reportType === 'GSS'
			? new ReadExcelDailyServicesGSS(this.readExcel).execute(excelFileName, listDrivers)
			: new ReadExcelDailyServicesMajorel(this.readExcel).execute(excelFileName, listDrivers));

		//- Creando las entidades de correo (EmailEntity)
		const fromEmail = new EmailFromEmail({
			email: administrator.getEmail(),
			key: administrator.getKeyEmail(),
		});
		const from = new EmailFrom(`${administrator.getName()} <${administrator.getEmail()}>`);

		const listEmails = reportsByDriver.map((item) => {
			const message = new CreateDailyServicesMessage().execute(item.reports, options);

			return new EmailEntity(
				new EmailMessage(message),
				new EmailSubject(`SERVICIOS DIARIOS DEL ${day} DE ${reportType}`),
				new EmailToEmail(item.email),
				fromEmail,
				from
			);
		});

		//- ESPERAR RESPUESTA DEL ENVIO DE CORREOS
		await Promise.all(listEmails.map((email) => this.sendEmail(email)));
	}
}
