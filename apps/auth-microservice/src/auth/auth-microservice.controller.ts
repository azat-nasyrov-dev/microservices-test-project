import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthMicroserviceService } from './auth-microservice.service';
import { Tokens } from './types/auth.interface';
import { Response } from 'express';
import { Cookie } from '@app/common/decorators/cookies.decorator';

const REFRESH_TOKEN = 'refreshtoken';

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
  public async login(@Body() dto: AuthLoginDto, @Res() res: Response) {
    const tokens = await this.authMicroserviceService.login(dto);

    if (!tokens) {
      throw new BadRequestException("Can't login");
    }

    this.setRefreshTokenToCookie(tokens, res);
  }

  @Get('refresh-tokens')
  public async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authMicroserviceService.refreshTokens(
      refreshToken,
    );

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookie(tokens, res);
  }

  private setRefreshTokenToCookie(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      path: '/',
    });

    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
