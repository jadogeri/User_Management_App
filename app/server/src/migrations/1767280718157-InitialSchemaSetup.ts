import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaSetup1767280718157 implements MigrationInterface {
    name = 'InitialSchemaSetup1767280718157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar CHECK("name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR')) NOT NULL DEFAULT ('USER'),
                "description" varchar(40) NOT NULL,
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "UQ_c216a82ffa1e4c6d0224c349272" UNIQUE ("description"),
                CONSTRAINT "CHK_09ad0b5975b16e41e986d19042" CHECK (
                    (
                        (
                            (
                                (
                                    (
                                        (
                                            (
                                                (
                                                    (
                                                        (
                                                            (
                                                                (
                                                                    (
                                                                        (
                                                                            (
                                                                                (
                                                                                    (
                                                                                        (
                                                                                            (
                                                                                                (
                                                                                                    (
                                                                                                        (
                                                                                                            (
                                                                                                                (
                                                                                                                    (
                                                                                                                        (
                                                                                                                            (
                                                                                                                                (
                                                                                                                                    (
                                                                                                                                        (
                                                                                                                                            (
                                                                                                                                                (
                                                                                                                                                    (
                                                                                                                                                        (
                                                                                                                                                            (
                                                                                                                                                                (
                                                                                                                                                                    (
                                                                                                                                                                        (
                                                                                                                                                                            (
                                                                                                                                                                                (
                                                                                                                                                                                    (
                                                                                                                                                                                        (
                                                                                                                                                                                            ("name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR'))
                                                                                                                                                                                        )
                                                                                                                                                                                    )
                                                                                                                                                                                )
                                                                                                                                                                            )
                                                                                                                                                                        )
                                                                                                                                                                    )
                                                                                                                                                                )
                                                                                                                                                            )
                                                                                                                                                        )
                                                                                                                                                    )
                                                                                                                                                )
                                                                                                                                            )
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )
                                                                                                                            )
                                                                                                                        )
                                                                                                                    )
                                                                                                                )
                                                                                                            )
                                                                                                        )
                                                                                                    )
                                                                                                )
                                                                                            )
                                                                                        )
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_role"("id", "name", "description")
            SELECT "id",
                "name",
                "description"
            FROM "role"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_role"
                RENAME TO "role"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "role"
                RENAME TO "temporary_role"
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar CHECK("name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR')) NOT NULL DEFAULT ('USER'),
                "description" varchar(40) NOT NULL,
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "UQ_c216a82ffa1e4c6d0224c349272" UNIQUE ("description"),
                CONSTRAINT "CHK_09ad0b5975b16e41e986d19042" CHECK (
                    (
                        (
                            (
                                (
                                    (
                                        (
                                            (
                                                (
                                                    (
                                                        (
                                                            (
                                                                (
                                                                    (
                                                                        (
                                                                            (
                                                                                (
                                                                                    (
                                                                                        (
                                                                                            (
                                                                                                (
                                                                                                    (
                                                                                                        (
                                                                                                            (
                                                                                                                (
                                                                                                                    (
                                                                                                                        (
                                                                                                                            (
                                                                                                                                (
                                                                                                                                    (
                                                                                                                                        (
                                                                                                                                            (
                                                                                                                                                (
                                                                                                                                                    (
                                                                                                                                                        (
                                                                                                                                                            (
                                                                                                                                                                (
                                                                                                                                                                    (
                                                                                                                                                                        (
                                                                                                                                                                            (
                                                                                                                                                                                (
                                                                                                                                                                                    (
                                                                                                                                                                                        (
                                                                                                                                                                                            ("name" IN ('ADMIN', 'USER', 'VIEWER', 'EDITOR'))
                                                                                                                                                                                        )
                                                                                                                                                                                    )
                                                                                                                                                                                )
                                                                                                                                                                            )
                                                                                                                                                                        )
                                                                                                                                                                    )
                                                                                                                                                                )
                                                                                                                                                            )
                                                                                                                                                        )
                                                                                                                                                    )
                                                                                                                                                )
                                                                                                                                            )
                                                                                                                                        )
                                                                                                                                    )
                                                                                                                                )
                                                                                                                            )
                                                                                                                        )
                                                                                                                    )
                                                                                                                )
                                                                                                            )
                                                                                                        )
                                                                                                    )
                                                                                                )
                                                                                            )
                                                                                        )
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        `);
        await queryRunner.query(`
            INSERT INTO "role"("id", "name", "description")
            SELECT "id",
                "name",
                "description"
            FROM "temporary_role"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_role"
        `);
    }

}
