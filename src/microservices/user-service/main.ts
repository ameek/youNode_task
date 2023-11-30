import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from 'modules/app.module';
import "reflect-metadata"

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host: 'localhost',
        port: 3001
      }
    },
  );
  await app.listen();
}
bootstrap();
