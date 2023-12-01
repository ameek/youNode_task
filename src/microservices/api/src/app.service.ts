import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PurchaseHistoryClientService } from './purchase-history-client/purchase-history-client.service';
import { UserClientService } from './userClient/userClient.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private readonly purchaseHistoryClientService: PurchaseHistoryClientService,
    private readonly userClientService: UserClientService,
    private readonly authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(loginDto: any): Promise<any> {
    console.log('loginDTO', loginDto);
    if (!loginDto.email && !loginDto.password) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    console.log('login', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
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
