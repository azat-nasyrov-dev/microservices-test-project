import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersMicroserviceService } from '../users/users-microservice.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Tokens } from './types/auth.interface';
import { compareSync } from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthMicroserviceService {
  private readonly logger = new Logger(AuthMicroserviceService.name);

  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly usersMicroserviceService: UsersMicroserviceService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: AuthRegisterDto) {
    const user: UserEntity = await this.usersMicroserviceService
      .findUserByEmail(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (user) {
      throw new ConflictException(
        'A user with this email is already registered',
      );
    }

    return await this.usersMicroserviceService.createUser(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  public async login(dto: AuthLoginDto): Promise<Tokens> {
    const user: UserEntity = await this.usersMicroserviceService
      .findUserByEmail(dto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user || compareSync(dto.password, dto.password)) {
      throw new UnauthorizedException('Wrong login or password');
    }

    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
      });

    const refreshToken = await this.getRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string): Promise<TokenEntity> {
    return this.tokenRepository.create({
      token: v4(),
      exp: add(new Date(), { weeks: 1 }),
      userId,
    });
  }
}
