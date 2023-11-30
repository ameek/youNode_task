// user-service/src/services/purchase-history.service.ts

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class PurchaseHistoryClientService {
    constructor(@Inject('PURCHASE_HISTORY_SERVICE') private purchaseHistoryServiceClient: ClientProxy) {}
//   private readonly purchaseHistoryServiceClient: ClientProxy;

//   constructor() {
//     this.purchaseHistoryServiceClient = ClientProxyFactory.create({
//       transport: Transport.TCP,
//       options: {
//         host: 'localhost',
//         port: 3005,
//       },
//     });
//   }

    async onModuleInit() {
        console.log("onModuleInit");
        await this.purchaseHistoryServiceClient.connect();
    }
  // Example method to send a message to the purchaseHistoryService
  async getPurchaseData(userId: string) {
    return this.purchaseHistoryServiceClient.send('getPurchaseData', userId).toPromise();
  }
}
