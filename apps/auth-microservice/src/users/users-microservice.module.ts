import { Module } from '@nestjs/common';
import { UsersMicroserviceController } from './users-microservice.controller';
import { UsersMicroserviceService } from './users-microservice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TokenEntity } from '../auth/entities/token.entity';
import { PostEntity } from '../../../posts-microservice/src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity, PostEntity])],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService],
  exports: [UsersMicroserviceService],
})
export class UsersMicroserviceModule {}
