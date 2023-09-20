import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostgressAdministratorModel } from './postgress-administrator.model';

@Entity('drivers')
export class PostgressDriverModel {
	@PrimaryGeneratedColumn()
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
