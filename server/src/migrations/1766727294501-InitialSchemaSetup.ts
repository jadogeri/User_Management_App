import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaSetup1766727294501 implements MigrationInterface {
    name = 'InitialSchemaSetup1766727294501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar(20) NOT NULL DEFAULT ('USER'),
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "CHK_21569450625c7d2b47004185c5" CHECK ("name" IN ('ADMIN', 'USER'))
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "fullname" varchar(40) NOT NULL,
                "username" varchar(40) NOT NULL,
                "email" varchar NOT NULL,
                "age" integer NOT NULL DEFAULT (0),
                "phone" varchar(15),
                "password" varchar(100) NOT NULL,
                "failedLogins" integer NOT NULL DEFAULT (0),
                "isEnabled" boolean NOT NULL DEFAULT (1),
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "status" (
                "id" integer PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL DEFAULT ('ENABLED'),
                CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"),
                CONSTRAINT "CHK_c9606cd2b199227790e7788335" CHECK ("name" IN ('ENABLED', 'LOCKED', 'DISABLED'))
            )
        `);
                    // Insert Roles
        await queryRunner.query(
            `INSERT INTO role (id, name) 
            VALUES (1, 'ADMIN'), (2, 'USER')`
        );
        // Insert Statuses
        await queryRunner.query(
            `INSERT INTO status (id, name) 
            VALUES (1, 'ENABLED'), (2, 'LOCKED'), (3, 'DISABLED')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "status"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
    }

}
