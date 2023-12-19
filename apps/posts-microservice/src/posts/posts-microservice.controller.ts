import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsMicroserviceService } from './posts-microservice.service';
import { User } from '@app/common/decorators/user.decorator';
import { UserEntity } from '../../../auth-microservice/src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('posts')
export class PostsMicroserviceController {
  constructor(
    private readonly postsMicroserviceService: PostsMicroserviceService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  public async createPost(
    @User() currentUser: UserEntity,
    @Body('post') dto: CreatePostDto,
  ) {
    return await this.postsMicroserviceService.createPost(currentUser, dto);
  }

  @Get(':id')
  public async findPostById(@Param('id') id: string) {
    return await this.postsMicroserviceService.findPostById(id);
  }

  @Get()
  public async findListOfPosts(
    @User('id') currentUserId: string,
    @Query() query: any,
  ) {
    return await this.postsMicroserviceService.findListOfPosts(
      currentUserId,
      query,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public async deletePostById(
    @User('id') currentUserId: string,
    @Param('id') id: string,
  ) {
    return await this.postsMicroserviceService.deletePostById(
      currentUserId,
      id,
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  public async updatePostById(
    @User('id') currentUserId: string,
    @Param('id') id: string,
    @Body('post') dto: UpdatePostDto,
  ) {
    return await this.postsMicroserviceService.updatePostById(
      currentUserId,
      id,
      dto,
    );
  }
}
