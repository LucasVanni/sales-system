import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1730051432129 implements MigrationInterface {
    name = 'AddIndexes1730051432129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_products_name" ON "products" ("name") `);
        await queryRunner.query(`CREATE INDEX "idx_clients_info" ON "clients" ("name", "email", "phone", "address") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_clients_info"`);
        await queryRunner.query(`DROP INDEX "public"."idx_products_name"`);
    }

}
