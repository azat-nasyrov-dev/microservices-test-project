import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com', description: 'Email' })
  @IsEmail()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ example: '123321', description: 'Password' })
  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly password?: string;
}
