import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3300',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  app.use(morgan('tiny'));
  await app.listen(3000);
}
bootstrap();
