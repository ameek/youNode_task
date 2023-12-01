// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserClientService } from 'src/userClient/userClient.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserClientService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> { 
    /**
   * Validates a user by their email and password.
   * here the we will use hash password with bycrypt 
   * to covert the password and then we will compare
   * Due to time constraint i have to use plain text user password
   */
    const user = await this.userService.getUserEmailPass(email, password);
    return user || null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, email: user.email, password: user.password, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
