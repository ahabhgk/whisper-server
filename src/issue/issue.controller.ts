import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueService } from './issue.service';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: number,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    return this.issueService.create(userId, createIssueDto);
  }

  @Get()
  findRecent(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.issueService.findRecent(paginationQueryDto);
  }
}
