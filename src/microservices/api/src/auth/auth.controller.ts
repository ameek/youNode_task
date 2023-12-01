// auth.controller.ts
import { Controller, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  @MessagePattern('login-not-being_used')
  async login(loginData:any) { // any will replace with user login interface
    // console.log('login on auth controller',loginData);
    // const user = await this.authService.validateUser(loginData.email, loginData.password);

    // if (!user) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    // return this.authService.login(user);
  }
}
