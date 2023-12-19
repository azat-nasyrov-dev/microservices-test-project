import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ example: 'johndoe@gmail.com', description: 'Email' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: '123321', description: 'Password' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
