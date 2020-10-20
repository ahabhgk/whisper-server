import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { User } from 'src/user/entities/user.entity';
import { Pub } from './entities/pub.entity';
import { PubController } from './pub.controller';
import { PubService } from './pub.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pub, User])],
  controllers: [PubController],
  providers: [PubService],
})
export class PubModule {}
