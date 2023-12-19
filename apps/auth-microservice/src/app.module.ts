import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMicroserviceModule } from './auth/auth-microservice.module';
import { UsersMicroserviceModule } from './users/users-microservice.module';
import { TypeormModule } from '@app/common/typeorm/typeorm.module';
import { RabbitmqModule } from '@app/common/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.auth.env',
    }),
    RabbitmqModule,
    TypeormModule,
    AuthMicroserviceModule,
    UsersMicroserviceModule,
  ],
})
export class AppModule {}
