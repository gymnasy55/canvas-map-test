/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || 8080;

  const config = new DocumentBuilder()
    .setTitle('Canvas Map Backend')
    .setDescription('Documentation HTTP API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${globalPrefix}/swagger`, app, document);

  await app.listen(port);

  const apiUrl = `http://localhost:${port}/${globalPrefix}`;

  Logger.log(`🚀 Application is running on: ${apiUrl}`);
  Logger.log(`🚀 Swagger is running on: ${apiUrl}/swagger`);
}

bootstrap();
