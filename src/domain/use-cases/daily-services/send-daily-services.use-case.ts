import { SendDailyServicesDTO } from '../../dto';
import { CustomError } from '../../errors';
import { AdministratorRepository } from '../../repositories';
import { CreateDailyServicesMessage } from './create-daily-services-message.use-case';
import { ReadExcelDailyServicesGSS } from './read-excel-daily-services-gss.use-case';

type ReadExcelFunction = (directory: string) => Promise<any>;
type SendEmailFunction = (
	emailData: { subject: string; message: string; toEmail: string; from: string },
	senderData: { email: string; key: string }
) => Promise<any>;

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

		//- SEPARAR LOS REPORTES EN LAS LISTAS DE LOS CONDUCTORES DEL ADMINISTRADOR, SEGÚN EL TIPO DE REPORTE
		const reportsByDriver = await (options.reportType === 'GSS'
			? new ReadExcelDailyServicesGSS(this.readExcel).execute(excelFileName, administrator.getDrivers())
			: []);

		//- CREAR LA LISTA DE TODOS LOS CONTENIDOS DE LOS CORREOS
		const emailContentList = reportsByDriver.map((item) => {
			const message = new CreateDailyServicesMessage().execute(item.reports, options);
			return {
				subject: `SERVICIOS DIARIOS DEL ${day} DE ${reportType}`,
				toEmail: item.email,
				message,
			};
		});

		//- ESPERAR RESPUESTA DEL ENVIO DE CORREOS
		await Promise.all(
			emailContentList.map((emailContent) =>
				this.sendEmail({ ...emailContent, from: `${name} <${email}>` }, { email: email, key: keyEmail })
			)
		);
	}
}
