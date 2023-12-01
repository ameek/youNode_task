import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from 'src/dtos/product.dto';
import { ProductService } from 'src/services/product.service';
import { PurchaseHistoryService } from 'src/services/purchaseHistory.service';
import { UserClientService } from 'src/services/user.service';
import { ProductList, ProductResponse } from 'src/types/productTypes';

@Controller('purchaseHistory')
export class PurchaseHistoryController {
  constructor(
    private readonly purchaseHistoryService: PurchaseHistoryService,
    private readonly userClientService: UserClientService,
  ) {}

  // fetch purchase history by user id by cursor based pagination
  @MessagePattern('getUserPurchaseHistory')
  async getUserPurchaseHistory(data: {
    userId: string;
    limit: number;
    cursor?: string;
  }) {
    return await this.purchaseHistoryService.getUserPurchaseHistory(
      data.userId,
      data.limit,
      data.cursor,
    );
  }

  /**
     * populate purchase history table
     * fetch user list
     * fetch product list
     * for each user create a history object containing user and product info
     * 
  
     */
  @MessagePattern('populatePurchaseHistory')
  async populatePurchaseHistory(): Promise<void> {
    return await this.purchaseHistoryService.populatePurchaseHistory();
  }

  // fetch purchase history by user id by cursor based pagination
  @MessagePattern('deleteUserPurchaseHistory')
  async deleteUserPurchaseHistory(userId: string) {
    return await this.purchaseHistoryService.deleteUserPurchaseHistory(userId);
  }
}
