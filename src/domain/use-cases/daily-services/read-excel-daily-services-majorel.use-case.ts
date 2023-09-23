import { DriverEntity, ReportEntity } from '../../entities';
import { CustomError } from '../../errors';
import {
	ReportAgent,
	ReportCategory,
	ReportDate,
	ReportDeliveryData,
	ReportDriverName,
	ReportLocation,
	ReportSchedule,
	ReportVoucher,
} from '../../value-objects';

type ReadExcelFunction<T> = (directory: string) => Promise<T[]>;

interface DataExcelMajorel {
	'FECHA': string;
	'SERVICIO': 'ingreso' | 'salida';
	'SEDE': string;
	'HORARIO': string;
	'CONDUCTOR': string;
	'DNI': string;
	'TRABAJADOR': string;
	'DIRECCION': string;
	'DISTRITO': string;
	'REFERENCIA': string;
	'VALE': string;
	'PRECIO': number;
	'HORA': string;
}

interface ReturnUseCase {
	email: string;
	reports: ReportEntity[];
}

export class ReadExcelDailyServicesMajorel {
	constructor(private readonly readExcel: ReadExcelFunction<DataExcelMajorel>) {}

	public async execute(excelName: string, listDrivers: DriverEntity[]): Promise<ReturnUseCase[]> {
		const dataExcel = await this.readExcel(`src/files/excel/MAJOREL/${excelName}.xlsx`);

		//TODO: BUSCAR UNA MEJOR MANERA DE PORDER SEPARAR Y CREAR LAS ENTIDADES DE REPORTE
		return listDrivers
			.map((driver) => {
				//- FILTRAR REPORTE POR LA LISTA DE CONDUCTORES ASIGNADOS, Y CREAMOS LAS ENTIDADES DE REPORTE
				const listReportsEntity = dataExcel
					.filter((report) => report.CONDUCTOR.trim().toUpperCase() === driver.name.getValue().toUpperCase())
					.map(this.createReportEntity);

				return {
					email: driver.email.getValue(),
					reports: listReportsEntity,
				};
			})
			.filter((data) => data.reports.length > 0);
	}

	private createReportEntity = (report: DataExcelMajorel, index: number) => {
		try {
			const dateObject = this.formatDate(report.FECHA.trim());
			const date = new ReportDate(dateObject);
			const category = new ReportCategory(report.SERVICIO);
			const schedule = new ReportSchedule(report.HORARIO);
			const driverName = new ReportDriverName(report.CONDUCTOR.trim());
			const agent = new ReportAgent({ name: report.TRABAJADOR.trim(), DNI: report.DNI });
			const location = new ReportLocation({
				address: report.DIRECCION,
				district: report.DISTRITO,
				reference: report.REFERENCIA,
			});
			const voucher = new ReportVoucher(report.VALE);
			const deliveryData = new ReportDeliveryData({
				endTime: report.HORA,
				minutes: '',
				typology: '',
			});

			return new ReportEntity(date, category, schedule, driverName, agent, location, voucher, deliveryData);
		} catch (error) {
			if (error instanceof CustomError) {
				throw CustomError.badRequest(
					`${error.message} ||| -Fila: ${index + 1} -Conductor: ${report.CONDUCTOR}`
				);
			}
			throw error;
		}
	};

	private formatDate(reportDate: string) {
		const date = new Date(reportDate);
		const day = `0${date.getDay()}`.slice(-2);
		const month = `0${date.getMonth()}`.slice(-2);
		const year = `0${date.getFullYear()}`.slice(-2);

		return `${day}.${month}.${year}`;
	}
}
