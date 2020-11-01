import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { IssueModule } from './issue/issue.module';
import { PubModule } from './pub/pub.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { CommonModule } from './common/common.module';

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
        logging: true,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    IssueModule,
    PubModule,
    AuthModule,
    SearchModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
