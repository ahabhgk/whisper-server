import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/auth.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/decorators/user.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse()
  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ description: '查找用户信息' })
  @ApiForbiddenResponse({ description: '只有用户自己可以查看自己的信息' })
  @ApiNotFoundResponse({ description: '用户未找到' })
  @ApiBearerAuth()
  @Get(':username')
  @UseGuards(JwtAuthGuard)
  findOne(
    @RequestUser() payload: JwtPayload,
    @Param('username') username: string,
  ) {
    if (payload.username === username) return this.userService.findOne(username);
    throw new ForbiddenException('Private information blocked');
  }

  @ApiOkResponse({ description: '更新用户信息' })
  @ApiForbiddenResponse({ description: '无权更改其他用户信息' })
  @ApiNotFoundResponse({ description: '用户未找到' })
  @ApiBearerAuth()
  @Patch(':username')
  @UseGuards(JwtAuthGuard)
  update(
    @RequestUser() payload: JwtPayload,
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (payload.username === username) return this.userService.update(username, updateUserDto);
    throw new ForbiddenException('No permission to change other user information')
  }
}
