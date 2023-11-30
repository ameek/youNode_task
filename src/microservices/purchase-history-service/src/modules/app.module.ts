import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { dataSourceOptions } from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { PurchaseHistoryModule } from './PurchaseHistory.module';
import { ProductModule } from './product.module';
import { UserClientModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PurchaseHistoryModule,
    ProductModule,
    UserClientModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    
  ],
})
export class AppModule {}
