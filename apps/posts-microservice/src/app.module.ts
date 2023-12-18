import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormModule } from '@app/common/typeorm/typeorm.module';
import { PostsMicroserviceModule } from './posts/posts-microservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.auth.env',
    }),
    TypeormModule,
    PostsMicroserviceModule,
  ],
})
export class AppModule {}
