import { Injectable } from '@nestjs/common';
import { IssueService } from 'src/issue/issue.service';
import { PubService } from 'src/pub/pub.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly pubService: PubService,
    private readonly issueService: IssueService,
  ) {}

  async search(keyword: string) {
    return {
      issues: await this.issueService.search(keyword),
      pubs: await this.pubService.search(keyword),
    };
  }
}
