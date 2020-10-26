import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtPayload } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '查找用户信息' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: '未授权' })
  @ApiForbiddenResponse({
    description: '无权限，只有用户自己可以查看自己的信息',
  })
  @ApiNotFoundResponse({ description: '用户未找到' })
  @ApiBearerAuth('access-token')
  @Get(':username')
  @UseGuards(JwtAuthGuard)
  findOne(
    @RequestUser() payload: JwtPayload,
    @Param('username') username: string,
  ) {
    if (payload.username === username) {
      return this.userService.findOne(username);
    }
    throw new ForbiddenException('No permission');
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: '未授权' })
  @ApiForbiddenResponse({ description: '无权限，无权更改其他用户信息' })
  @ApiNotFoundResponse({ description: '用户未找到' })
  @ApiBearerAuth('access-token')
  @Patch(':username')
  @UseGuards(JwtAuthGuard)
  update(
    @RequestUser() payload: JwtPayload,
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (payload.username === username) {
      return this.userService.update(username, updateUserDto);
    }
    throw new ForbiddenException('No permission');
  }
}
