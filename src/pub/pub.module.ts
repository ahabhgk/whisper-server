import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Pub } from './entities/pub.entity';
import { PubController } from './pub.controller';
import { PubService } from './pub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pub, User]), UserModule],
  controllers: [PubController],
  providers: [PubService],
})
export class PubModule {}
