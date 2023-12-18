import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthMicroserviceService } from './auth-microservice.service';

@Controller('auth')
export class AuthMicroserviceController {
  constructor(
    private readonly authMicroserviceService: AuthMicroserviceService,
  ) {}

  @Post('register')
  public async register(@Body() dto: AuthRegisterDto) {
    const user = await this.authMicroserviceService.register(dto);

    if (!user) {
      throw new BadRequestException("Can't register user");
    }

    return user;
  }

  @Post('login')
  public async login(@Body() dto: AuthLoginDto) {
    const tokens = await this.authMicroserviceService.login(dto);

    if (!tokens) {
      throw new BadRequestException("Can't login");
    }

    return { accessToken: tokens.accessToken };
  }

  @Get('refresh')
  public async refreshTokens() {}
}
