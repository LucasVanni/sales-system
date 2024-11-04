import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1730050814506 implements MigrationInterface {
  name = 'InitialMigration1730050814506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "stock" integer NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE add_client(
            p_name VARCHAR,
            p_email VARCHAR,
            p_phone VARCHAR,
            p_address VARCHAR
        )
        LANGUAGE plpgsql
        AS $$
        BEGIN
            INSERT INTO clients (id, name, email, phone, address, created_at, updated_at)
            VALUES (gen_random_uuid(), p_name, p_email, p_phone, p_address, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
        END;
        $$;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
