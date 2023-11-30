import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseHistoryNproduct1701208656420 implements MigrationInterface {
    name = 'PurchaseHistoryNproduct1701208656420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase_histories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "productId" uuid NOT NULL, "purchaseQuantity" integer NOT NULL, "purchaseTimestamp" TIMESTAMP NOT NULL, "purchasePrice" integer NOT NULL, "discountApplied" integer NOT NULL, "totalAmountPaid" integer NOT NULL, "paymentMethod" character varying NOT NULL, CONSTRAINT "PK_f7b87e56108fb87a2b2fd317e6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_productstatus_enum" AS ENUM('available', 'outofstock', 'discontinued')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productCode" character varying NOT NULL, "productName" character varying NOT NULL, "productDescription" character varying NOT NULL, "productCategory" character varying NOT NULL, "productImage" character varying NOT NULL, "productPrice" integer NOT NULL, "productStockQuantity" integer NOT NULL, "productStatus" "public"."products_productstatus_enum" NOT NULL, "productAddedDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase_histories" ADD CONSTRAINT "FK_aac86ac92feaeaa28119f49c9c0" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase_histories" DROP CONSTRAINT "FK_aac86ac92feaeaa28119f49c9c0"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_productstatus_enum"`);
        await queryRunner.query(`DROP TABLE "purchase_histories"`);
    }

}
