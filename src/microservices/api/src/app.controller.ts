import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { UserClientService } from './userClient/userClient.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userClientService: UserClientService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
}
