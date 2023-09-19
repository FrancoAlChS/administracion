import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import DriverEntity from './Driver.entity';

@Entity('administrators')
export class AdministratorEntity {
	@PrimaryColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 50,
		unique: true,
	})
	name: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	email: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	keyEmail: string;

	@OneToMany(() => DriverEntity, (driver) => driver.administrator)
	drivers: DriverEntity[];
}
