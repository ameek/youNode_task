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
  getUserList(limit: number, cursor?: string): Promise<any> {
    console.log('getUserById on user client service', 'limit', limit);

    return this.client.send('users', { limit, cursor }).toPromise();
  }

  // // auth login on user client
  // login(loginDto: any): Promise<any> {
  //   console.log('login on user client service', loginDto);
  //   return this.client.send('login', loginDto).toPromise();
  // }

  //delete user on userId
  deleteUser(userId: string): Promise<any> {
    console.log('deleteUser on user client service', userId);
    return this.client.send('deleteUser', userId).toPromise();
  }

  getUser(userId: string): Promise<any> {
    console.log('userById on user client service', userId);
    return this.client.send('userById', userId).toPromise();
  }

  getUserEmailPass(email: string, password: string): Promise<any> {
    return this.client
      .send('getUserEmailPass', { email, password })
      .toPromise();
  }
}
