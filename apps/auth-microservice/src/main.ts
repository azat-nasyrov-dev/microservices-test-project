import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  /** Swagger */
  const options = new DocumentBuilder()
    .setTitle('Auth-Microservice')
    .setDescription('Auth-Microservice documentation')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .addTag('Developed by Azat Nasyrov')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/auth-microservice/docs', app, document);

  await app.listen(3000);
}

bootstrap();
