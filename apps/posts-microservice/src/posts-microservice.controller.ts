import { Controller, Get } from '@nestjs/common';
import { PostsMicroserviceService } from './posts-microservice.service';

@Controller()
export class PostsMicroserviceController {
  constructor(private readonly postsMicroserviceService: PostsMicroserviceService) {}

  @Get()
  getHello(): string {
    return this.postsMicroserviceService.getHello();
  }
}
