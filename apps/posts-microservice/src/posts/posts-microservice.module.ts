import { Module } from '@nestjs/common';
import { PostsMicroserviceController } from './posts-microservice.controller';
import { PostsMicroserviceService } from './posts-microservice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from '../../../auth-microservice/src/users/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostsMicroserviceController],
  providers: [PostsMicroserviceService, AuthGuard],
})
export class PostsMicroserviceModule {}
