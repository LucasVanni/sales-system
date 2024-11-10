import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1731260229657 implements MigrationInterface {
    name = 'AddIndex1731260229657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "idx_products_name" ON "products" ("name") `);
        await queryRunner.query(`CREATE INDEX "idx_clients_info" ON "clients" ("name", "email", "phone", "address") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_clients_info"`);
        await queryRunner.query(`DROP INDEX "public"."idx_products_name"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "created_at" SET NOT NULL`);
    }

}
