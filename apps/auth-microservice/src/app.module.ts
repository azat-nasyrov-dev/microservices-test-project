import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { AuthMicroserviceModule } from './auth/auth-microservice.module';
import { UsersMicroserviceModule } from './users/users-microservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.auth.env',
    }),
    TypeOrmModule.forRootAsync(getTypeOrmConfig()),
    AuthMicroserviceModule,
    UsersMicroserviceModule,
  ],
})
export class AppModule {}
