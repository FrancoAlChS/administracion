import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostgressDriverModel } from './postgress-driver.model';

@Entity('administrators')
export class PostgressAdministratorModel {
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

	@Column({
		type: 'varchar',
		unique: true,
	})
	keyEmail: string;

	@OneToMany(() => PostgressDriverModel, (driver) => driver.administrator)
	drivers: PostgressDriverModel[];
}
