import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @ApiProperty({ example: '07dc88e4-4961-4081-8f38-bf9803a0ae64', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', description: 'Token' })
  @Column()
  token: string;

  @ApiProperty({ example: '1h', description: 'Token expires' })
  @Column()
  exp: Date;

  @ApiProperty({ example: '07dc88e4-4961-4081-8f38-bf9803a0ae64', description: 'User ID' })
  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
