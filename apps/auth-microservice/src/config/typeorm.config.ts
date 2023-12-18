import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/entities/user.entity';

export const getTypeOrmConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      url: getTypeOrmString(configService),
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};

const getTypeOrmString = (configService: ConfigService) =>
  'postgresql://' +
  configService.get<string>('POSTGRES_USERNAME') +
  ':' +
  configService.get<string>('POSTGRES_PASSWORD') +
  '@' +
  configService.get<string>('POSTGRES_HOST') +
  ':' +
  configService.get<number>('POSTGRES_PORT') +
  '/' +
  configService.get<string>('POSTGRES_DATABASE');
