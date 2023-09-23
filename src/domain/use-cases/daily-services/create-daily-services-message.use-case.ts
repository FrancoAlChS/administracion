import { Greetings, ReportTypes } from '../../constants';
import { ReportEntity } from '../../entities';

interface Options {
	reportType: ReportTypes;
	greeting: Greetings;
	day: string;
}

export class CreateDailyServicesMessage {
	private readonly stylesTable = `font-size: 8pt; text-align: center; vertical-align: middle; color: black; font-family: Calibri, sans-serif; border-collapse: collapse; white-space: nowrap;`;
	private readonly stylesCell = `text-align: center;  border: 0.5pt solid windowtext; padding: 3px 10px;`;
	private readonly stylesCellHead = this.stylesCell + 'height: 22.5pt;';
	private readonly stylesCellBody = this.stylesCell + 'height: 15pt;';

	constructor() {}

	private FormatRowBody(reportEntity: ReportEntity, reportType: ReportTypes) {
		const report = reportEntity.getValues();

		return `<tr>
		<td style="${this.stylesCellBody}"> ${report.date} </td>
		<td style="${this.stylesCellBody}"> ${report.schedule} </td>
		<td style="${this.stylesCellBody}"> ${report.category} </td>
		<td style="${this.stylesCellBody}"> ${report.driverName} </td>
		<td style="${this.stylesCellBody}"> ${report.agent.name} </td>
		<td style="${this.stylesCellBody}"> ${report.address || ''} </td>
		<td style="${this.stylesCellBody}"> ${report.district || ''} </td>
		<td style="${this.stylesCellBody}"> ${report.reference || ''} </td>
		<td style="${this.stylesCellBody}"> ${report.endTime || ''} </td>
		${
			reportType === 'GSS'
				? `<td style="${this.stylesCellBody}"> ${report.typology || ''} </td>
					<td style="${this.stylesCellBody}"> ${report.minutes || ''} </td>`
				: ''
		}
		<td style="${this.stylesCellBody};background: #f00;color: #fff"> ${report.voucherNumber || ''} </td>
	</tr>`;
	}

	private createRowHead(reportType: ReportTypes) {
		return `
						<td style="${this.stylesCellHead} background: #92d050;">FECHA</td>
						<td style="${this.stylesCellHead} background: #92d050;">HORA</td>
						<td style="${this.stylesCellHead} background: #92d050;">INGRES-SALIDA</td>
						<td style="${this.stylesCellHead} background: #92d050;">CONDUCTOR</td>
						<td style="${this.stylesCellHead} background: #44546a;">APELLIDOS Y NOMBRES</td>
						<td style="${this.stylesCellHead} background: #44546a;">DIRECCION</td>
						<td style="${this.stylesCellHead} background: #44546a;">DISTRITO</td>
						<td style="${this.stylesCellHead} background: #44546a;">REFERENCIAS</td>
						<td style="${this.stylesCellHead} background: #8497b0;">HORA LLEGADA</td>
						${
							reportType == 'GSS'
								? `<td style="${this.stylesCellHead} background: #8497b0;">TIPOLOGIA</td>  
									<td style="${this.stylesCellHead} background: #8497b0;">TARDANZA-ADELANTO</td>`
								: ''
						}  
						<td style="${this.stylesCellHead} background: #8497b0;">N° VALE</td>
						`;
	}

	private createRowsBody(reportEntity: ReportEntity[], reportType: ReportTypes) {
		const rowsBody = reportEntity.map((report) => this.FormatRowBody(report, reportType)).join(' ');
		return rowsBody;
	}

	private messageInformation(options: Options) {
		const { greeting, day, reportType } = options;

		return `
			<p style="color: black"> 
				${greeting}.
				<br/><br/> 
				Estimado, se envía sus servicios realizados el ${day}, para el cliente ${reportType}.<br />
				Cualquier observación y/o reclamo deberá hacerlo por este medio en un plazo de 24 horas de lo contrario se considerará aceptado.
				<br /><br />
				No se aceptarán reclamos fuera del tiempo establecido, para ello, debe recordar que estos servicios se considerarán para su liquidación de la quincena.
				<br /><br />
				Saludos cordiales.
			</p>
		`;
	}

	public execute(reports: ReportEntity[], options: Options) {
		const message = `
			${this.messageInformation(options)}
			<br/><br/>
			<table style=" ${this.stylesTable} ">
				<thead style="color: white;" >
					<tr>${this.createRowHead(options.reportType)}</tr>
				</thead>
				<tbody> ${this.createRowsBody(reports, options.reportType)} </tbody>
			</table>
		`;
		return message;
	}
}
