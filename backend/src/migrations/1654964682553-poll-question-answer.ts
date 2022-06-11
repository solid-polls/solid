import {MigrationInterface, QueryRunner} from "typeorm";

export class pollQuestionAnswer1654964682553 implements MigrationInterface {
    name = 'pollQuestionAnswer1654964682553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "polls" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_b9bbb8fc7b142553c518ddffbb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "pollId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "count" integer NOT NULL, "questionId" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_357f04f283d64a768a249258a08" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_357f04f283d64a768a249258a08"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "polls"`);
    }

}
