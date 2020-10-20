import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      return this.userService.filterUserPassword(user);
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { email: user.email, userId: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
