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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsMicroserviceController {
  constructor(
    private readonly postsMicroserviceService: PostsMicroserviceService,
    private readonly rmqService: RMQService,
  ) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  public async createPost(
    @User() currentUser: UserEntity,
    @Body('post') dto: CreatePostDto,
  ) {
    return await this.postsMicroserviceService.createPost(currentUser, dto);
  }

  @ApiOperation({ summary: 'Get single post' })
  @ApiResponse({ status: 200, description: 'Return single post' })
  @Get(':id')
  public async findPostById(@Param('id') id: string) {
    return await this.postsMicroserviceService.findPostById(id);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts' })
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

  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
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

  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully updated',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
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
