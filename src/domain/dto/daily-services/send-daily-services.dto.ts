import { Greetings, ReportTypes } from '../../constants';
import { CustomError } from '../../errors';

interface SendDailyServicesRequest {
	excelFileName: string;
	greeting: Greetings;
	day: string;
}

export class SendDailyServicesDTO {
	constructor(
		public readonly reportType: ReportTypes,
		public readonly greeting: Greetings,
		public readonly day: string,
		public readonly excelFileName: string
	) {}

	public static create(dataRequest: SendDailyServicesRequest, reportType: ReportTypes) {
		if (dataRequest.excelFileName === undefined || dataRequest.excelFileName === '') {
			throw CustomError.badRequest('Se debe enviar el nombre del archivo excel');
		}

		if (!Object.values(Greetings).includes(dataRequest.greeting)) {
			throw CustomError.badRequest(
				'El saludo solo puede ser "Buenos días", "Buenas tardes" o "Buenas noches" '
			);
		}

		//TODO: Falta validar el formato de la fecha
		if (dataRequest.day === undefined || dataRequest.day === '') {
			throw CustomError.badRequest('Se debe enviar la fecha');
		}

		return new SendDailyServicesDTO(
			reportType,
			dataRequest.greeting,
			dataRequest.day,
			dataRequest.excelFileName
		);
	}
}
