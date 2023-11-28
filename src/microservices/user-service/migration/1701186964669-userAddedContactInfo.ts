import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddedContactInfo1701186964669 implements MigrationInterface {
    name = 'UserAddedContactInfo1701186964669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "contact_number" character varying(11)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contact_number"`);
    }

}