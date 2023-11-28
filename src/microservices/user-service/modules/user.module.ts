// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'controllers/user.controller';
import { User } from 'entities/user.entity';
import { UserService } from 'services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity into the module

  ],
  controllers: [UserController], // Register the UserController
  providers: [UserService], // Register the UserService
})
export class UserModule {}
