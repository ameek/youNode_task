export default {
  uri: 'amqp://localhost:5672',
  queue: 'batch-queue',
};
export interface RabbitMQConfig {
  uri: string;
  queue: string;
}
