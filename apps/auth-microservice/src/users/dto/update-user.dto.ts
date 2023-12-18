import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;
}
