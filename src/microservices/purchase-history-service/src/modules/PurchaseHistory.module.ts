import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseHistoryController } from "src/controllers/purchaseHistory.controller";
import { PurchaseHistory } from "src/entities/purchaseHistory.entity";
import { PurchaseHistoryService } from "src/services/purchaseHistory.service";
import { ProductModule } from "./product.module";
import { UserClientModule } from "./user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PurchaseHistory]),
        UserClientModule,
        ProductModule
    ],
    controllers: [PurchaseHistoryController],
    providers: [PurchaseHistoryService],
})
export class PurchaseHistoryModule {}