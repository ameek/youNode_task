// user.controller.ts
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  Put,
  Delete,
  Query,
  Patch,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateUserDto
} from 'src/dtos/user.dto';
import { UserService } from 'src/services/user.service';
import { UserList, UserRespones } from 'src/types/userTypes';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @MessagePattern('userById')
  async getUserById(id: string): Promise<UserRespones> {
    console.log('user service all', id);
    return await this.userService.getUserById(id);
  }

  // @UseGuards(JwtAuthGuard)
  @MessagePattern('users')
  async getUsers(data): Promise<UserList> {
    try {
      const users = await this.userService.getUsers(data.limit, data?.cursor);
      return users;
    } catch (error) {
      throw new NotFoundException('Failed to fetch users');
    }
  }

  @MessagePattern('getUserEmailPass')
  async getUserEmailPass(data): Promise<any> {
    return this.userService.getUserEmailPass(data.email, data.password);
  }

  @MessagePattern('deleteUser')
  async deleteUser(data): Promise<{ message: string }> {
    return this.userService.deleteUser(data.id);
  }

  //   @Put(':id')
  //   async updateUser(
  //     @Param('id') id: string,
  //     @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  //   ): Promise<User> {
  //     return this.userService.updateUser(id, updateUserDto);
  //   }

  //   @Get()
  //   async getUsers(@Query() query: any): Promise<User[]> {
  //     return this.userService.getUsers(query);
  //   }

  //   @Patch(':id/update-profile')
  //   async updateProfile(
  //     @Param('id') id: string,
  //     @Body(new ValidationPipe()) updateProfileDto: UpdateProfileDto,
  //   ): Promise<User> {
  //     return this.userService.updateProfile(id, updateProfileDto);
  //   }

  //   @Post(':id/logout')
  //   async logoutUser(@Param('id') id: string): Promise<{ message: string }> {
  //     return this.userService.logoutUser(id);
  //   }
}
