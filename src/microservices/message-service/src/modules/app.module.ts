import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { BatchModule } from 'src/batch/batch.module';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [RabbitMQModule, BatchModule,ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly rabbitMQService: RabbitMQService) {
    this.rabbitMQService.init();
  }
}
