import { Module } from '@nestjs/common';
import { PostsMicroserviceController } from './posts-microservice.controller';
import { PostsMicroserviceService } from './posts-microservice.service';

@Module({
  controllers: [PostsMicroserviceController],
  providers: [PostsMicroserviceService],
})
export class PostsMicroserviceModule {}
