import { Module } from '@nestjs/common';
import rabbitmqConfig from './rabbitmq.config';
import { RabbitMQService } from './rabbitMQ.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'RABBIT_MQ_CONFIG',
      useValue: rabbitmqConfig,
    },
    RabbitMQService,
  ],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
