import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      url: getTypeOrmString(configService),
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
