import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695173616659 implements MigrationInterface {
    name = 'Migration1695173616659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "drivers_id_seq" OWNED BY "drivers"."id"`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "id" SET DEFAULT nextval('"drivers_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_799934c1c8f8c7c43709ef9b8df"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "administrators_id_seq" OWNED BY "administrators"."id"`);
        await queryRunner.query(`ALTER TABLE "administrators" ALTER COLUMN "id" SET DEFAULT nextval('"administrators_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_799934c1c8f8c7c43709ef9b8df" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_799934c1c8f8c7c43709ef9b8df"`);
        await queryRunner.query(`ALTER TABLE "administrators" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "administrators_id_seq"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_799934c1c8f8c7c43709ef9b8df" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "drivers_id_seq"`);
    }

}
