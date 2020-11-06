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
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.NODE_ENV === 'production' ? 'postgres' : 'mysql',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      playground: true,
      debug: true,
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
