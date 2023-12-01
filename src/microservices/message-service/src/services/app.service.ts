import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

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
