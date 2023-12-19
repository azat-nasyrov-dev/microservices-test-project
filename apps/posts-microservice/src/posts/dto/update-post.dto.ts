import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'New title', description: 'Title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'New description', description: 'Description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ example: 'New body', description: 'Body' })
  @IsString()
  @IsNotEmpty()
  readonly body: string;
}
