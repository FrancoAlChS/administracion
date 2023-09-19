export class AdministratorEntity {
	constructor(
		public readonly id: number,
		public name: string,
		public email: string,
		public keyEmail: string
	) {}
}
