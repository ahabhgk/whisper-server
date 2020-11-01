import { ForbiddenException, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
} from '@nestjs/graphql';
import { JwtPayload } from '../auth/auth.interface';
import { GqlUser } from '../common/decorators/request-user.decorator';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlJwtAuthGuard)
  user(@GqlUser() payload: JwtPayload, @Args('username') username: string) {
    if (payload.username === username) {
      return this.userService.findOne(username);
    }
    throw new ForbiddenException('No permission');
  }
}
