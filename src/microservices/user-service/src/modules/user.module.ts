  // user.module.ts

  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { UserController } from 'src/controllers/user.controller';
  import { User } from 'src/entities/user.entity';
  import { UserService } from 'src/services/user.service';

  @Module({
    imports: [
      TypeOrmModule.forFeature([User]), // Import the User entity into the module

    ],
    controllers: [UserController], // Register the UserController
    providers: [UserService], // Register the UserService
    exports: [UserService], // Export the UserService
  })
  export class UserModule {}
