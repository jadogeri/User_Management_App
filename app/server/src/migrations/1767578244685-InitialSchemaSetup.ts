import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaSetup1767578244685 implements MigrationInterface {
    name = 'InitialSchemaSetup1767578244685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "status" (
                "id" integer PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL DEFAULT ('ENABLED'),
                CONSTRAINT "UQ_95ff138b88fdd8a7c9ebdb97a32" UNIQUE ("name"),
                CONSTRAINT "CHK_c9606cd2b199227790e7788335" CHECK ("name" IN ('ENABLED', 'LOCKED', 'DISABLED'))
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
                "phone" varchar(15),
                "password" varchar(100) NOT NULL,
                "failedLogins" integer NOT NULL DEFAULT (0),
                "isEnabled" boolean NOT NULL DEFAULT (1),
                "suspension" json,
                "status_id" integer,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "permission" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "description" varchar,
                "resource" varchar CHECK(
                    "resource" IN (
                        'user',
                        'auth',
                        'product',
                        'order',
                        'project',
                        'invoice',
                        'document',
                        'system',
                        '*'
                    )
                ) NOT NULL DEFAULT ('*'),
                "action" varchar CHECK(
                    "action" IN ('create', 'read', 'update', 'delete', 'manage', '*')
                ) NOT NULL DEFAULT ('read'),
                CONSTRAINT "UQ_b7f40c3248fc7ad7c35151e2d11" UNIQUE ("action", "resource")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar CHECK("name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR')) NOT NULL DEFAULT ('USER'),
                "description" varchar(40) NOT NULL,
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "UQ_c216a82ffa1e4c6d0224c349272" UNIQUE ("description"),
                CONSTRAINT "CHK_09ad0b5975b16e41e986d19042" CHECK ("name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR'))
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "auth" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "refreshToken" varchar,
                "userId" integer,
                CONSTRAINT "UQ_5fb5d6abb950a839551fe3c5de9" UNIQUE ("refreshToken"),
                CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar(40),
                "lastName" varchar(40),
                "displayName" varchar(40),
                "bio" varchar(100),
                "avatarUrl" varchar(100),
                "age" integer NOT NULL DEFAULT (0),
                "userId" integer,
                CONSTRAINT "UQ_479d02ec9ef94c6d7e920e34875" UNIQUE ("displayName"),
                CONSTRAINT "UQ_d3df8418e774a2706511cbdcc21" UNIQUE ("avatarUrl"),
                CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "user_id" integer NOT NULL,
                "role_id" integer NOT NULL,
                PRIMARY KEY ("user_id", "role_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "role_permissions" (
                "role_id" integer NOT NULL,
                "permission_id" integer NOT NULL,
                PRIMARY KEY ("role_id", "permission_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "fullname" varchar(40) NOT NULL,
                "username" varchar(40) NOT NULL,
                "email" varchar NOT NULL,
                "phone" varchar(15),
                "password" varchar(100) NOT NULL,
                "failedLogins" integer NOT NULL DEFAULT (0),
                "isEnabled" boolean NOT NULL DEFAULT (1),
                "suspension" json,
                "status_id" integer,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "FK_892a2061d6a04a7e2efe4c26d6f" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"(
                    "createdAt",
                    "updatedAt",
                    "id",
                    "fullname",
                    "username",
                    "email",
                    "phone",
                    "password",
                    "failedLogins",
                    "isEnabled",
                    "suspension",
                    "status_id"
                )
            SELECT "createdAt",
                "updatedAt",
                "id",
                "fullname",
                "username",
                "email",
                "phone",
                "password",
                "failedLogins",
                "isEnabled",
                "suspension",
                "status_id"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_auth" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "refreshToken" varchar,
                "userId" integer,
                CONSTRAINT "UQ_5fb5d6abb950a839551fe3c5de9" UNIQUE ("refreshToken"),
                CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"),
                CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_auth"(
                    "createdAt",
                    "updatedAt",
                    "id",
                    "refreshToken",
                    "userId"
                )
            SELECT "createdAt",
                "updatedAt",
                "id",
                "refreshToken",
                "userId"
            FROM "auth"
        `);
        await queryRunner.query(`
            DROP TABLE "auth"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_auth"
                RENAME TO "auth"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_profile" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar(40),
                "lastName" varchar(40),
                "displayName" varchar(40),
                "bio" varchar(100),
                "avatarUrl" varchar(100),
                "age" integer NOT NULL DEFAULT (0),
                "userId" integer,
                CONSTRAINT "UQ_479d02ec9ef94c6d7e920e34875" UNIQUE ("displayName"),
                CONSTRAINT "UQ_d3df8418e774a2706511cbdcc21" UNIQUE ("avatarUrl"),
                CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"),
                CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_profile"(
                    "createdAt",
                    "updatedAt",
                    "id",
                    "firstName",
                    "lastName",
                    "displayName",
                    "bio",
                    "avatarUrl",
                    "age",
                    "userId"
                )
            SELECT "createdAt",
                "updatedAt",
                "id",
                "firstName",
                "lastName",
                "displayName",
                "bio",
                "avatarUrl",
                "age",
                "userId"
            FROM "profile"
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_profile"
                RENAME TO "profile"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_87b8888186ca9769c960e92687"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b23c65e50a758245a33ee35fda"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_user_roles" (
                "user_id" integer NOT NULL,
                "role_id" integer NOT NULL,
                CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("user_id", "role_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user_roles"("user_id", "role_id")
            SELECT "user_id",
                "role_id"
            FROM "user_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user_roles"
                RENAME TO "user_roles"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_178199805b901ccd220ab7740e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_17022daf3f885f7d35423e9971"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_role_permissions" (
                "role_id" integer NOT NULL,
                "permission_id" integer NOT NULL,
                CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                PRIMARY KEY ("role_id", "permission_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_role_permissions"("role_id", "permission_id")
            SELECT "role_id",
                "permission_id"
            FROM "role_permissions"
        `);
        await queryRunner.query(`
            DROP TABLE "role_permissions"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_role_permissions"
                RENAME TO "role_permissions"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_17022daf3f885f7d35423e9971"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_178199805b901ccd220ab7740e"
        `);
        await queryRunner.query(`
            ALTER TABLE "role_permissions"
                RENAME TO "temporary_role_permissions"
        `);
        await queryRunner.query(`
            CREATE TABLE "role_permissions" (
                "role_id" integer NOT NULL,
                "permission_id" integer NOT NULL,
                PRIMARY KEY ("role_id", "permission_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "role_permissions"("role_id", "permission_id")
            SELECT "role_id",
                "permission_id"
            FROM "temporary_role_permissions"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_role_permissions"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b23c65e50a758245a33ee35fda"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_87b8888186ca9769c960e92687"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_roles"
                RENAME TO "temporary_user_roles"
        `);
        await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "user_id" integer NOT NULL,
                "role_id" integer NOT NULL,
                PRIMARY KEY ("user_id", "role_id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user_roles"("user_id", "role_id")
            SELECT "user_id",
                "role_id"
            FROM "temporary_user_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user_roles"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
                RENAME TO "temporary_profile"
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar(40),
                "lastName" varchar(40),
                "displayName" varchar(40),
                "bio" varchar(100),
                "avatarUrl" varchar(100),
                "age" integer NOT NULL DEFAULT (0),
                "userId" integer,
                CONSTRAINT "UQ_479d02ec9ef94c6d7e920e34875" UNIQUE ("displayName"),
                CONSTRAINT "UQ_d3df8418e774a2706511cbdcc21" UNIQUE ("avatarUrl"),
                CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "profile"(
                    "createdAt",
                    "updatedAt",
                    "id",
                    "firstName",
                    "lastName",
                    "displayName",
                    "bio",
                    "avatarUrl",
                    "age",
                    "userId"
                )
            SELECT "createdAt",
                "updatedAt",
                "id",
                "firstName",
                "lastName",
                "displayName",
                "bio",
                "avatarUrl",
                "age",
                "userId"
            FROM "temporary_profile"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_profile"
        `);
        await queryRunner.query(`
            ALTER TABLE "auth"
                RENAME TO "temporary_auth"
        `);
        await queryRunner.query(`
            CREATE TABLE "auth" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "refreshToken" varchar,
                "userId" integer,
                CONSTRAINT "UQ_5fb5d6abb950a839551fe3c5de9" UNIQUE ("refreshToken"),
                CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "auth"(
                    "createdAt",
                    "updatedAt",
                    "id",
                    "refreshToken",
                    "userId"
                )
            SELECT "createdAt",
                "updatedAt",
                "id",
                "refreshToken",
                "userId"
            FROM "temporary_auth"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_auth"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "fullname" varchar(40) NOT NULL,
                "username" varchar(40) NOT NULL,
                "email" varchar NOT NULL,
                "phone" varchar(15),
                "password" varchar(100) NOT NULL,
                "failedLogins" integer NOT NULL DEFAULT (0),
                "isEnabled" boolean NOT NULL DEFAULT (1),
                "suspension" json,
                "status_id" integer,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"(
                    "createdAt",
                    "updatedAt",
                    "id",
                    "fullname",
                    "username",
                    "email",
                    "phone",
                    "password",
                    "failedLogins",
                    "isEnabled",
                    "suspension",
                    "status_id"
                )
            SELECT "createdAt",
                "updatedAt",
                "id",
                "fullname",
                "username",
                "email",
                "phone",
                "password",
                "failedLogins",
                "isEnabled",
                "suspension",
                "status_id"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_17022daf3f885f7d35423e9971"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_178199805b901ccd220ab7740e"
        `);
        await queryRunner.query(`
            DROP TABLE "role_permissions"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_b23c65e50a758245a33ee35fda"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_87b8888186ca9769c960e92687"
        `);
        await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            DROP TABLE "auth"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TABLE "permission"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "status"
        `);
    }

}
