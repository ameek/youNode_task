import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class PurchaseHistoryClientService {
  constructor(
    @Inject('PURCHASE_HISTORY_SERVICE')
    private purchaseHistoryServiceClient: ClientProxy,
  ) {}

  async onModuleInit() {
    console.log('onModuleInit client for purchaseHistoryClient');
    await this.purchaseHistoryServiceClient.connect();
  }
  // Example method to send a message to the purchaseHistoryService
  async getProduct(prodructId: string) {
    return this.purchaseHistoryServiceClient
      .send('GetProduct', prodructId)
      .toPromise();
  }

  async populatePurchaseHistory(): Promise<void> {
    return this.purchaseHistoryServiceClient
      .send('populatePurchaseHistory', '')
      .toPromise();
  }

  async getUserPurchaseHistory(
    userId: string,
    limit: number,
    cursor?: string,
  ): Promise<void> {
    return this.purchaseHistoryServiceClient
      .send('getUserPurchaseHistory', { userId, limit, cursor })
      .toPromise();
  }
}
