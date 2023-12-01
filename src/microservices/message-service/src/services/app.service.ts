import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BatchService } from 'src/batch/batch.service';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';

@Injectable()
export class AppService {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly batchService: BatchService,
  ) {}


  /**
   * Every day at 8 am
   * preparing the batch for sending messages to the queue
   * then consume the messages from the queue with rabitmq
   */
  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  RunCorn() {
    console.log('Corn Started at 8 am each day ');
    this.batchService.processBatchUserPurchaseHistory();
    this.consumeMessages();
  }

  consumeMessages() {
    this.rabbitMQService
      .getChannel()
      .consume(
        this.rabbitMQService.getQueue(),
        this.handleMessages.bind(this),
        { noAck: false },
      );
  }

  /**
   *
   * @param message this will be my message sending API
   * as no API was provided, I am just using console.log
   */
  private async handleMessages(message) {
    if (message) {
      const msg = JSON.parse(message.content);
      console.log(msg);
      this.rabbitMQService.getChannel().ack(message);
    }
  }
}
