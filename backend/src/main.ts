import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.APP_URL,
    methods: 'GET',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(3000);
}
bootstrap();
