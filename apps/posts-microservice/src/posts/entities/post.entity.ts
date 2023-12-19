import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../../auth-microservice/src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'posts' })
export class PostEntity {
  @ApiProperty({
    example: '07dc88e4-4961-4081-8f38-bf9803a0ae64',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'New title', description: 'Title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'New description', description: 'Description' })
  @Column({ default: '' })
  description: string;

  @ApiProperty({ example: 'New body' , description: 'Body'})
  @Column({ default: '' })
  body: string;

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

  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: true })
  author: UserEntity;
}
