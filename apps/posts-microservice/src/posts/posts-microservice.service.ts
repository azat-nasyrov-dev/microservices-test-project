import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../../auth-microservice/src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsMicroserviceService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  public async createPost(currentUser: UserEntity, dto: CreatePostDto) {
    const post = new PostEntity();
    Object.assign(post, dto);

    post.author = currentUser;
    return await this.postRepository.save(post);
  }

  public async findPostById(id: string) {
    return await this.postRepository.findOne({ where: { id } });
  }

  public async findListOfPosts(currentUserId: string, query: any) {
    const queryBuilder = this.dataSource
      .getRepository(PostEntity)
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.author', 'author');

    queryBuilder.orderBy('posts.createdAt', 'DESC');

    const postsCount = await queryBuilder.getCount();

    if (query.author) {
      const author = await this.userRepository.findOne({
        where: { email: query.author },
      });
      queryBuilder.andWhere('posts.authorId = :id', {
        id: author.id,
      });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const posts = await queryBuilder.getMany();
    return { posts, postsCount };
  }

  public async deletePostById(currentUserId: string, id: string) {
    const post = await this.findPostById(id);

    if (!post) {
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
    }

    if (post.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.postRepository.delete({ id });
  }

  public async updatePostById(
    currentUserId: string,
    id: string,
    dto: UpdatePostDto,
  ) {
    const post = await this.findPostById(id);

    if (!post) {
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
    }

    if (post.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(post, dto);
    return await this.postRepository.save(post);
  }
}
