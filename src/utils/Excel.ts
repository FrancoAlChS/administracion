import xlsx from 'xlsx';

export class Excel {
	public static readExcel<T>(directory: string, sheet: number = 0) {
		const book = xlsx.readFile(directory);
		const sheets = book.SheetNames;
		const dataExcel: T[] = xlsx.utils.sheet_to_json(book.Sheets[sheets[sheet]], {
			raw: false,
		});

		return dataExcel;
	}
}
