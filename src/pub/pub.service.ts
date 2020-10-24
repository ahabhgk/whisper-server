import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePubDto } from './dto/create-pub.dto';
import { Pub } from './entities/pub.entity';

@Injectable()
export class PubService {
  constructor(
    @InjectRepository(Pub) private readonly pubRepository: Repository<Pub>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async create(username: string, createPubDto: CreatePubDto) {
    const { name } = createPubDto;
    const existed = await this.pubRepository.findOne({ name });
    if (existed) {
      throw new BadRequestException('The name used by the pub already exists');
    }
    const pub = this.pubRepository.create(createPubDto);
    pub.founder = await this.userRepository.findOne(username);
    return this.pubRepository.save(pub);
  }

  async join(pubId: number, username: string) {
    const user = await this.userRepository.findOne(username, {
      relations: ['pubs'],
    });
    if (!user) throw new NotFoundException('User not fount');
    const pub = await this.pubRepository.findOne(pubId, {
      relations: ['users'],
    });
    if (!pub) throw new NotFoundException('Pub not fount');
    user.pubs.push(pub);
    pub.users.push(user);
    this.userRepository.save(user);
    return this.pubRepository.save(pub);
  }
}
