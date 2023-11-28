import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { UserModule } from './user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
