import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/auth.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/decorators/user.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueService } from './issue.service';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post(':pubId')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('pubId') pubId: number,
    @RequestUser() payload: JwtPayload,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    return this.issueService.create(pubId, payload.username, createIssueDto);
  }

  @Get()
  findRecent(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.issueService.findRecent(paginationQueryDto);
  }
}
