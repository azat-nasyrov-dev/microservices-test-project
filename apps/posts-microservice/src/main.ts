import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Swagger */
  const options = new DocumentBuilder()
    .setTitle('Post-Microservice')
    .setDescription('Post-Microservice documentation')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .addTag('Developed by Azat Nasyrov')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/posts-microservice/docs', app, document);

  await app.init();
}

bootstrap();
