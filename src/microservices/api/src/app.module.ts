import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserClientModule } from './userClient/userClient.module';

@Module({
  imports: [UserClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}