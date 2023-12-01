import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/modules/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3006,
      },
    },
  );
  await app.listen();

}
bootstrap();
