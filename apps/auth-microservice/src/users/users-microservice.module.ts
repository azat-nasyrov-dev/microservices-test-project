import { Module } from '@nestjs/common';
import { UsersMicroserviceController } from './users-microservice.controller';
import { UsersMicroserviceService } from './users-microservice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService],
})
export class UsersMicroserviceModule {}
