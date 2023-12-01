import { Injectable } from '@nestjs/common';
import { PurchaseHistoryClientService } from './purchase-history-client/purchase-history-client.service';
import { UserClientService } from './userClient/userClient.service';

@Injectable()
export class AppService {
  constructor(
    private readonly purchaseHistoryClientService: PurchaseHistoryClientService,
    private readonly userClientService: UserClientService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async deleteUser(id: string): Promise<any> {
    try {
      //get valid user
      const user = await this.userClientService.getUser(id);
      if (!user.success) {
        return 'no user found';
      }
      //delete user purchase history
      const purchaseHistory =
        await this.purchaseHistoryClientService.deleteUserPurchaseHistory(id);
      if (purchaseHistory !== 'error or history delete') {
        //delete user
        const deleteUser = await this.userClientService.deleteUser(id);
        return deleteUser;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
