import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PostgressDriverModel } from './postgress-driver.model';

@Entity('administrators')
export class PostgressAdministratorModel {
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

	@OneToMany(() => PostgressDriverModel, (driver) => driver.administrator)
	drivers: PostgressDriverModel[];
}
