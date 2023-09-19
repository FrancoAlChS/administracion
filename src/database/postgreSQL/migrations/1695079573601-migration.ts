import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695079573601 implements MigrationInterface {
    name = 'Migration1695079573601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drivers" ("id" integer NOT NULL, "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "administratorId" integer, CONSTRAINT "UQ_a679ed59119fd25c5e586212f4e" UNIQUE ("name"), CONSTRAINT "UQ_d4cfc1aafe3a14622aee390edb2" UNIQUE ("email"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrators" ("id" integer NOT NULL, "name" character varying(50) NOT NULL, "email" character varying NOT NULL, "keyEmail" character varying NOT NULL, CONSTRAINT "UQ_4a507bcaedc14bb3d5ef4178518" UNIQUE ("name"), CONSTRAINT "UQ_4ee5216a00cb99b2dede98509c1" UNIQUE ("email"), CONSTRAINT "UQ_d3cb89612a16358ad390047e65b" UNIQUE ("keyEmail"), CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_799934c1c8f8c7c43709ef9b8df" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_799934c1c8f8c7c43709ef9b8df"`);
        await queryRunner.query(`DROP TABLE "administrators"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
    }

}
