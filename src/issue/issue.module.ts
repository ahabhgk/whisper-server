import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Issue } from './entities/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Issue])],
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}
