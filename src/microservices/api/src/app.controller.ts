import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserClientService } from './userClient/userClient.service';
import { PurchaseHistoryClientService } from './purchase-history-client/purchase-history-client.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userClientService: UserClientService,
    private readonly purchaseHistoryClientService: PurchaseHistoryClientService,
    private readonly localStrategy: LocalStrategy,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/populatePurchaseHistory')
  async populatePurchaseHistory(): Promise<void> {
    const history =
      await this.purchaseHistoryClientService.populatePurchaseHistory();
  }

  @Get('/getUserPurchaseHistory')
  async getUserPurchaseHistory(
    @Query('userId') userId: string,
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string,
  ): Promise<void> {
    console.log('user client', userId, limit, cursor);
    return await this.purchaseHistoryClientService.getUserPurchaseHistory(
      userId,
      limit,
      cursor,
    );
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return await this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/userList')
  async getUserData(
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string,
  ) {
    try {
      console.log('user client');
      const userList = await this.userClientService.getUserList(limit, cursor);
      return { userList };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete('/deleteUser')
  async deleteUser(@Query('id') id: string): Promise<string> {
    try {
      console.log('user client', id);
      const user = await this.appService.deleteUser(id);
      return user;
    } catch (error) {
      return error.message || error;
    }
  }

  @Get('/userById')
  async getUser(@Query('id') id: string): Promise<string> {
    try {
      console.log('user client', id);
      const user = await this.userClientService.getUser(id);
      return user;
    } catch (error) {
      return error.message || error;
    }
  }
  @Get('/getproduct')
  async getProduct(@Query('productid') productid?: string) {
    try {
      console.log('user client');
      const userList =
        await this.purchaseHistoryClientService.getProduct(productid);
      console.log('users', userList);
      return { userList };
    } catch (error) {
      return { error: error.message };
    }
  }
}
