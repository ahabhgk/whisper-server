import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtPayload } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../common/decorators/user.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueService } from './issue.service';

@ApiTags('issue')
@Controller()
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @ApiOperation({ summary: '创建 issue' })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ description: '未授权' })
  @ApiForbiddenResponse({ description: '无权限' })
  @ApiBearerAuth('access-token')
  @Post('pub/:pubId/:username/issue')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('pubId') pubId: string,
    @Param('username') username: string,
    @RequestUser() payload: JwtPayload,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    if (username === payload.username) {
      return this.issueService.create(pubId, username, createIssueDto);
    }
    throw new ForbiddenException('No permission');
  }

  @ApiOperation({ summary: '获取最近的公开 pub 的 issues' })
  @ApiOkResponse()
  @Get('issue/recent/public')
  findRecentPublicIssue(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.issueService.findRecent(paginationQueryDto);
  }

  @ApiOperation({ summary: '获取最近的订阅的 pub 的 issues' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: '未授权' })
  @ApiForbiddenResponse({ description: '无权限' })
  @ApiBearerAuth('access-token')
  @Get('issue/recent/sub/:username')
  @UseGuards(JwtAuthGuard)
  findRecentSubIssue(
    @Param('username') username: string,
    @RequestUser() payload: JwtPayload,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    if (username === payload.username) {
      return this.issueService.findRecent(paginationQueryDto, username);
    }
    throw new ForbiddenException('No permission');
  }
}
