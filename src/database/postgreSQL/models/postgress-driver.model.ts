import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PostgressAdministratorModel } from './postgress-administrator.model';

@Entity('drivers')
export class PostgressDriverModel {
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

	@ManyToOne(() => PostgressAdministratorModel, (administrator) => administrator.drivers)
	administrator: PostgressAdministratorModel;
}
