// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity into the module
    // Other module configurations...
  ],
})
export class UserModule {}
