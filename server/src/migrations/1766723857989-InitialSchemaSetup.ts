import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaSetup1766723857989 implements MigrationInterface {
    name = 'InitialSchemaSetup1766723857989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar(20) NOT NULL DEFAULT ('USER'),
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "CHK_21569450625c7d2b47004185c5" CHECK ("name" IN ('ADMIN', 'USER'))
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_role"("id", "name")
            SELECT "id",
                "name"
            FROM "role"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_role"
                RENAME TO "role"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_status" (
                "id" integer PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL DEFAULT ('ENABLED'),
                CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"),
                CONSTRAINT "CHK_c9606cd2b199227790e7788335" CHECK ("name" IN ('ENABLED', 'LOCKED', 'DISABLED'))
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_status"("id", "name")
            SELECT "id",
                "name"
            FROM "status"
        `);
        await queryRunner.query(`
            DROP TABLE "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_status"
                RENAME TO "status"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "status"
                RENAME TO "temporary_status"
        `);
        await queryRunner.query(`
            CREATE TABLE "status" (
                "id" integer PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL DEFAULT ('ENABLED'),
                CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "status"("id", "name")
            SELECT "id",
                "name"
            FROM "temporary_status"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_status"
        `);
        await queryRunner.query(`
            ALTER TABLE "role"
                RENAME TO "temporary_role"
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar(20) NOT NULL DEFAULT ('USER'),
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "role"("id", "name")
            SELECT "id",
                "name"
            FROM "temporary_role"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_role"
        `);
    }

}
