import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly password?: string;
}
