import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './auth-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
