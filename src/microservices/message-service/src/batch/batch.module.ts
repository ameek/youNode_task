import { Module } from '@nestjs/common';
import { PurchaseHistoryClientModule } from 'src/client/PurchaseHistoryClient/purchase-history-client.module';
import { UserClientModule } from 'src/client/userClient/userClient.module';
import { BatchService } from './batch.service';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';

@Module({
  imports: [PurchaseHistoryClientModule, UserClientModule, RabbitMQModule],
  controllers: [],
  providers: [BatchService],
  exports: [BatchService],
})
export class BatchModule {}
