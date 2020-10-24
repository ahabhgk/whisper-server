import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RequestUser } from '../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@RequestUser() auth: Auth) {
    return this.authService.login(auth);
  }
}
