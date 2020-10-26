import { Module } from '@nestjs/common';
import { IssueModule } from '../issue/issue.module';
import { PubModule } from '../pub/pub.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [PubModule, IssueModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
