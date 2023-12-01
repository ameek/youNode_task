import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserClientModule } from './userClient/userClient.module';
import { PurchaseHistoryClientModule } from './purchase-history-client/purchase-history-client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserClientModule, PurchaseHistoryClientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
