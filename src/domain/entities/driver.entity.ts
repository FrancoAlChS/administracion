export class DriverEntity {
	constructor(
		public readonly id: number,
		public name: string,
		public email: string,
		public administratorId: number
	) {}
}
