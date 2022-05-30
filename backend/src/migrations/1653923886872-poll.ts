import {MigrationInterface, QueryRunner} from "typeorm";

export class poll1653923886872 implements MigrationInterface {
    name = 'poll1653923886872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "polls" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "code" integer NOT NULL, CONSTRAINT "PK_b9bbb8fc7b142553c518ddffbb6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "polls"`);
    }

}
