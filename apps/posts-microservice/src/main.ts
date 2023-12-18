import { NestFactory } from '@nestjs/core';
import { PostsMicroserviceModule } from './posts-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(PostsMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
