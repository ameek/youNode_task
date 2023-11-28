import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { dataSourceOptions } from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }],
})
export class AppModule {}
