import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { UserClientService } from './userClient/userClient.service';
import { PurchaseHistoryClientService } from './purchase-history-client/purchase-history-client.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userClientService: UserClientService,
    private readonly purchaseHistoryClientService: PurchaseHistoryClientService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Param('email') email: string, @Param('password') password: string) {
    console.log('user client',email,password);
    const login = await this.userClientService.login({ email, password });
  }

  @Get('/userList')
  async getUserData(
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string,
  ) {
    try {
      console.log('user client');
      const userList = await this.userClientService.getUserById(limit, cursor);
      // console.log('users', userList);
      return { userList };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('/getproduct')
  async getProduct(
    @Query('productid') productid?: string,
  ) {
    try {
      console.log('user client');
      const userList = await this.purchaseHistoryClientService.getProduct(productid);
      console.log('users', userList);
      return { userList };
    } catch (error) {
      return { error: error.message };
    }
  }
}
