import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { RequestUser } from '../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@RequestUser() user: User) {
    return this.authService.login(user);
  }
}
