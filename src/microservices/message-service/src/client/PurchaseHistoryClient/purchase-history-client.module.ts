// user-service/src/modules/purchase-history-client/purchase-history-client.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PurchaseHistoryClientService } from './purchase-history-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PURCHASE_HISTORY_SERVICE', // Unique identifier for the client
        transport: Transport.TCP, // Transport type (TCP, Redis, etc.)
        options: {
          host: 'localhost', // Host of purchaseHistoryService
          port: 3005, // Port of purchaseHistoryService
        },
      },
    ]),
  ],
  providers: [PurchaseHistoryClientService],
  exports: [PurchaseHistoryClientService],
})
export class PurchaseHistoryClientModule {}
