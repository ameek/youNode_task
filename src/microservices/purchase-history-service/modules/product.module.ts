import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "controllers/product.controller";
import { Product } from "entities/product.entity";
import { ProductService } from "services/product.service";
import { UserClientModule } from "./user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        UserClientModule
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}