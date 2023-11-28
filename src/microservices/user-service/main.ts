import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import "reflect-metadata"

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
