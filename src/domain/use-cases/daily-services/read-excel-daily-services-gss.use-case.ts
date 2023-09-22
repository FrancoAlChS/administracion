import { DriverEntity } from '../../entities';
import { ReportEntity } from '../../entities/report.entity';
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

interface ReadExcelDailyServicesGSSUseCase {
	execute(
		excelName: string,
		listDrivers: DriverEntity[]
	): Promise<{ email: string; reports: ReportEntity[] }[]>;
}

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

export class ReadExcelDailyServicesGSS implements ReadExcelDailyServicesGSSUseCase {
	constructor(private readonly readExcel: ReadExcelFunction<DataExcelGSS>) {}

	public async execute(
		excelName: string,
		listDrivers: DriverEntity[]
	): Promise<{ email: string; reports: ReportEntity[] }[]> {
		const dataExcel = await this.readExcel(`src/files/excel/GSS/${excelName}.xlsx`);

		return listDrivers
			.map((driver) => {
				const reports = dataExcel
					.filter((report) => report.CONDUCTOR.trim().toUpperCase() === driver.name.getValue().toUpperCase())
					.map(this.createReportEntity);

				return {
					email: driver.email.getValue(),
					reports: reports,
				};
			})
			.filter((data) => data.reports.length > 0);
	}

	private createReportEntity(report: DataExcelGSS) {
		const date = new ReportDate(report.FECHA);
		const category = new ReportCategory(report['INGRESO-SALIDA']);
		const schedule = new ReportSchedule(report.HORA);
		const driverName = new ReportDriverName(report.CONDUCTOR);
		const agent = new ReportAgent({ name: report['APELLIDOS Y NOMBRES'], DNI: report.DNI });
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
	}
}
