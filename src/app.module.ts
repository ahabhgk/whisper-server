import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { IssueModule } from './issue/issue.module';
import { PubModule } from './pub/pub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || 'development'}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_POST,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    IssueModule,
    PubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
