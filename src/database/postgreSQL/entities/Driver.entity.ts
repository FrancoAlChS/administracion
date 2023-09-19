import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AdministratorEntity } from './Administrator.entity';

@Entity('drivers')
export class DriverEntity {
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

	@ManyToOne(() => AdministratorEntity, (administrator) => administrator.drivers)
	administrator: AdministratorEntity;
}
