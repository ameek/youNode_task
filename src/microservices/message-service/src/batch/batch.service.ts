import { Injectable } from '@nestjs/common';
import { PurchaseHistoryClientService } from 'src/client/PurchaseHistoryClient/purchase-history-client.service';
import { UserClientService } from 'src/client/userClient/userClient.service';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';

@Injectable()
export class BatchService {
  constructor(
    private readonly userClientService: UserClientService,
    private readonly purchaseHistoryClientService: PurchaseHistoryClientService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async processBatchUserPurchaseHistory() {
    await this.generateUserMessage(100);
  }

  private async generateUserMessage(limit: number): Promise<any> {
    let cursor = '';

    while (true) {
      const userList = await this.userClientService.getUsers(limit, cursor);
      await Promise.all(
        userList.users.map(async (user) => {
          const purchaseHistory =
            await this.purchaseHistoryClientService.getUserPurchaseHistory(
              user.id,
              100,
              '',
            );
          const messages = this.constructMessages(user, purchaseHistory);
          this.rabbitMQService.sendToQueue(JSON.stringify(messages));
        }),
      );
      if (userList.hasNextPage === false) break;
      cursor = userList.lastCursor;
    }
  }

  private constructMessages(user, purchaseHistory) {
    /**
     * structure the message as needed
     */
    return {
      id: user.id,
      purchaseHistory: purchaseHistory,
    };
  }
}
