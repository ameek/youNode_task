import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
  }

  @MessagePattern('consume')
  async consumeMessages() {
    console.log('consumeMessages');
    const msg = this.appService.consumeMessages();
  }
}
