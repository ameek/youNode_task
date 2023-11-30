import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserClientService implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async onModuleInit() {
    console.log('onModuleInit for user client service');
    await this.client.connect();
  }

  // Add a method to send a message to the USER_SERVICE
  getUserById(limit: number, cursor?: string): Promise<any> {
    console.log('getUserById on user client service', "limit",limit);

    return this.client.send('users', { limit, cursor }).toPromise();
  }

  // auth login on user client
  login(loginDto: any): Promise<any> {
    return this.client.send('login', loginDto).toPromise();
  }
}
