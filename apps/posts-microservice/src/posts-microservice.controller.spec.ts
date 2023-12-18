import { Test, TestingModule } from '@nestjs/testing';
import { PostsMicroserviceController } from './posts-microservice.controller';
import { PostsMicroserviceService } from './posts-microservice.service';

describe('PostsMicroserviceController', () => {
  let postsMicroserviceController: PostsMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostsMicroserviceController],
      providers: [PostsMicroserviceService],
    }).compile();

    postsMicroserviceController = app.get<PostsMicroserviceController>(PostsMicroserviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(postsMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
