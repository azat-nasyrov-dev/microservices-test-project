import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TokenEntity } from '../../auth/entities/token.entity';
import { PostEntity } from '../../../../posts-microservice/src/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({ example: '07dc88e4-4961-4081-8f38-bf9803a0ae64', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'johndoe@gmail.com', description: 'Email' })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: '123321', description: 'Password' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({ example: '19.12.23', description: 'Date of creation' })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({ example: '19.12.23', description: 'Date of update' })
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];
}
