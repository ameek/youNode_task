import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseHistory } from "src/entities/PurchaseHistory.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([PurchaseHistory]),
    ],
    controllers: [],
    providers: [],
})
export class PurchaseHistoryModule {}