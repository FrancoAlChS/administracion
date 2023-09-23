import { DriverEntity } from '../../entities';
import { ReportEntity } from '../../entities/report.entity';
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

interface DataExcelGSS {
	'FECHA': string;
	'SEDE': string;
	'HORA': string;
	'INGRESO-SALIDA': 'ingreso' | 'salida';
	'CONDUCTOR': string;
	'DNI': string;
	'APELLIDOS Y NOMBRES': string;
	'DIRECCIÓN': string;
	'DISTRITO': string;
	'REFERENCIAS': string;
	'N° VALE': string;
	'PRECIO': number;
	'CELLCOMBINATE'?: number;
	'HR LLGD Y SALIDA': string;
	'TIPOLOGIA': string;
	'TARDANZA-ADELANTO': string;
}

interface ReturnUseCase {
	email: string;
	reports: ReportEntity[];
}

export class ReadExcelDailyServicesGSS {
	constructor(private readonly readExcel: ReadExcelFunction<DataExcelGSS>) {}

	public async execute(excelName: string, listDrivers: DriverEntity[]): Promise<ReturnUseCase[]> {
		const dataExcel = await this.readExcel(`src/files/excel/GSS/${excelName}.xlsx`);

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

	private createReportEntity = (report: DataExcelGSS, index: number) => {
		try {
			const dateObject = this.formatDate(report.FECHA.trim());
			const date = new ReportDate(dateObject);
			const category = new ReportCategory(report['INGRESO-SALIDA']);
			const schedule = new ReportSchedule(report.HORA);
			const driverName = new ReportDriverName(report.CONDUCTOR.trim());
			const agent = new ReportAgent({ name: report['APELLIDOS Y NOMBRES'].trim(), DNI: report.DNI });
			const location = new ReportLocation({
				address: report.DIRECCIÓN,
				district: report.DISTRITO,
				reference: report.REFERENCIAS,
			});
			const voucher = new ReportVoucher(report['N° VALE']);
			const deliveryData = new ReportDeliveryData({
				endTime: report['HR LLGD Y SALIDA'],
				minutes: report['TARDANZA-ADELANTO'],
				typology: report.TIPOLOGIA,
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
