import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
