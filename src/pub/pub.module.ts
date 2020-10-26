import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Pub } from './entities/pub.entity';
import { PubController } from './pub.controller';
import { PubService } from './pub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pub, User])],
  controllers: [PubController],
  providers: [PubService],
  exports: [PubService],
})
export class PubModule {}
