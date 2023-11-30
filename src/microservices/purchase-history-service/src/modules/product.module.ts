import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "src/controllers/product.controller";
import { Product } from "src/entities/product.entity";
import { ProductService } from "src/services/product.service";
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