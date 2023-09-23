import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695442910675 implements MigrationInterface {
    name = 'Migration1695442910675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "UQ_a679ed59119fd25c5e586212f4e"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "UQ_a679ed59119fd25c5e586212f4e" UNIQUE ("name")`);
    }

}
