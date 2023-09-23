import xlsx from 'xlsx';

export class Excel {
	public static async readExcel(directory: string, sheet: number = 0) {
		const book = xlsx.readFile(directory);
		const sheets = book.SheetNames;
		const dataExcel = xlsx.utils.sheet_to_json(book.Sheets[sheets[sheet]], {
			raw: false,
		});

		return dataExcel;
	}
}
