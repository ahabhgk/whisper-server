import { Body, Controller, Delete, ForbiddenException, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtPayload } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../common/decorators/user.decorator';
import { CreatePubDto } from './dto/create-pub.dto';
import { PubService } from './pub.service';

@Controller('pub')
export class PubController {
  constructor(private readonly pubService: PubService) {}

  @ApiOperation({ summary: '创建 pub' })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ description: '缺少 access-token' })
  @ApiBadRequestResponse({ description: 'pub 已存在' })
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @RequestUser() payload: JwtPayload,
    @Body() createPubDto: CreatePubDto,
  ) {
    return this.pubService.create(payload.username, createPubDto);
  }

  @ApiOperation({ summary: '加入 pub' })
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: '无权限' })
  @ApiBearerAuth('access-token')
  @Put(':pubId/:username')
  @UseGuards(JwtAuthGuard)
  join(@Param('pubId') pubId: string, @Param('username') username: string, @RequestUser() payload: JwtPayload) {
    if (username === payload.username) {
      return this.pubService.join(pubId, payload.username);
    }
    throw new ForbiddenException('No permission')
  }

  @ApiOperation({ summary: '退出 pub' })
  @ApiOkResponse()
  @ApiForbiddenResponse({ description: '无权限' })
  @Delete(':pubId/:username')
  @UseGuards(JwtAuthGuard)
  exit(@Param('pubId') pubId: string, @Param('username') username: string, @RequestUser() payload: JwtPayload) {
    if (username === payload.username) {
      return this.pubService.exit(pubId, payload.username);
    }
    throw new ForbiddenException('No permission')
  }
}
