import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './auth-microservice.controller';
import { AuthMicroserviceService } from './auth-microservice.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersMicroserviceModule } from '../users/users-microservice.module';
import { options } from '../config/jwt.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    UsersMicroserviceModule,
  ],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService],
})
export class AuthMicroserviceModule {}
