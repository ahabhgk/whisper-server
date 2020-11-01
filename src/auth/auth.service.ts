import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async validateUser(username: string, password: string) {
    const auth = await this.authRepository.findOne(username);
    if (auth && (await compare(password, auth.password))) {
      return auth;
    }
    return null;
  }

  async create(createAuthDto: CreateAuthDto) {
    const { username } = createAuthDto;
    const oldAuth = await this.authRepository.findOne(username);
    if (oldAuth) {
      throw new BadRequestException('Username already exists');
    }
    const auth = this.authRepository.create(createAuthDto);
    const user = this.userService.create(username);
    this.authRepository.save(auth);
    return user;
  }

  async login(auth: Auth) {
    return { access_token: this.jwtService.sign({ username: auth.username }) };
  }
}
