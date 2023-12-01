import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseHistory } from 'src/entities/purchaseHistory.entity';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { ProductService } from './product.service';
import { UserClientService } from './user.service';

@Injectable()
export class PurchaseHistoryService {
  constructor(
    @InjectRepository(PurchaseHistory)
    private readonly purchaseHistoryRepository: Repository<PurchaseHistory>,
    private readonly productService: ProductService,
    private readonly userClientService: UserClientService,
  ) {}

  private async createUserPurchaseHistory(limit: number): Promise<any> {
    let cursor = '';
    let userPurchaseHistory: PurchaseHistory[] = [];

    //fecth 10 producst
    const products = await this.productService.getProducts(2, '');

    while (true) {
      const userList = await this.userClientService.getUsers(limit, cursor);
      for (const user of userList.users) {
        for (const product of products.products) {
          const purchaseHistory = new PurchaseHistory();
          purchaseHistory.userId = user.id;
          purchaseHistory.productId = product.id;
          purchaseHistory.purchaseQuantity = 1;
          purchaseHistory.purchaseTimestamp = new Date();
          purchaseHistory.purchasePrice = product.productPrice;
          purchaseHistory.discountApplied = 0;
          purchaseHistory.totalAmountPaid = product.productPrice;
          purchaseHistory.paymentMethod = 'Cash';
          userPurchaseHistory.push(purchaseHistory);
        }
      }
      if (userList.hasNextPage === false) break;
      cursor = userList.lastCursor;
    }
    return userPurchaseHistory;
  }

  async populatePurchaseHistory(): Promise<any> {
    try {
      const userPurchaseList = await this.createUserPurchaseHistory(2);
      console.log('userList', userPurchaseList);

      //creatin chunk for 10
      const userPurchaseChunks = this.createChunks(userPurchaseList, 10);
      const purchaseHistoryPromise = userPurchaseChunks.map(
        (userPurchaseChunk) => {
          this.purchaseHistoryRepository.save(userPurchaseChunk);
        },
      );
      return await Promise.all(purchaseHistoryPromise);
    } catch (error) {
      throw new Error(`Failed to create purchase history: ${error.message}`);
    }
  }

  async getUserPurchaseHistory(
    userId: string,
    limit: number,
    cursor?: string,
  ): Promise<any> {
    try {
      console.log('user client', userId, limit, cursor);
      const MAX_LIMIT = 100;
      limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;
      const queryOptions: FindManyOptions<PurchaseHistory> = {
        take: limit,
        order: { id: 'ASC' },
        where: cursor
          ? { userId: userId, id: MoreThan(cursor) }
          : { userId: userId },
      };

      const [purchaseHistory, count] =
        await this.purchaseHistoryRepository.findAndCount(queryOptions);

      const hasNextPage = count > limit;

      return {
        purchaseHistory: purchaseHistory.slice(0, limit),
        hasNextPage,
        lastCursor: purchaseHistory.length
          ? purchaseHistory[purchaseHistory.length - 1].id
          : '',
      };
    } catch (error) {
      throw new Error('Failed to fetch purchase history: ' + error.message);
    }
  }

  private createChunks(userPurchaseList: PurchaseHistory[], chunkSize: number) {
    const userPurchaseChunks = [];
    for (let i = 0; i < userPurchaseList.length; i += chunkSize) {
      const chunk = userPurchaseList.slice(i, i + chunkSize);
      userPurchaseChunks.push(chunk);
    }
    return userPurchaseChunks;
  }
}
