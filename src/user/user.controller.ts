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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/auth.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/decorators/user.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
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

  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@RequestUser() payload: JwtPayload, @Param('id') id: number) {
    if (payload.userId === id) return this.userService.findOne(id);
    throw new ForbiddenException('Private information blocked');
  }

  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'The email used by the user already exists',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'User not found' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get(':id/owned-pubs/')
  findOwnedPubs(@Param('id') id: number) {
    return this.userService.findOwnedPubs(id);
  }
}
