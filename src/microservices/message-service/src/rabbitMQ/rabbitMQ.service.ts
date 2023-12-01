import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';

import { RabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;

  constructor(
    @Inject('RABBIT_MQ_CONFIG') private readonly config: RabbitMQConfig,
  ) {}

  async onModuleInit() {
    await this.init();
  }

  async onModuleDestroy() {
    await this.close();
  }

  async init() {
    this.connection = await connect(this.config.uri);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.config.queue);
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  async sendToQueue(message: any) {
    this.channel.sendToQueue(this.config.queue, Buffer.from(message));
  }
  getChannel() {
    return this.channel;
  }
  getQueue() {
    return this.config.queue;
  }
}
