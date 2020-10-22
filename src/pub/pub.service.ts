import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(userId: number, createPubDto: CreatePubDto) {
    const { name } = createPubDto;
    const existed = await this.pubRepository.findOne({ name });
    if (existed) {
      throw new BadRequestException('The name used by the pub already exists');
    }
    const pub = this.pubRepository.create(createPubDto);
    const user = pub.founder = await this.userRepository.findOne(userId);
    const saved = await this.pubRepository.save(pub);
    return { ...saved, founder: this.userService.filterUserPassword(user) }
  }

  async join(pubId: number, userId: number) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['pubs'],
    })
    if (!user) throw new NotFoundException('User not fount')
    const pub = await this.pubRepository.findOne(pubId, {
      relations: ['users'],
    })
    if (!pub) throw new NotFoundException('Pub not fount')
    user.pubs.push(pub)
    pub.users.push(user)
    this.userRepository.save(user)
    return this.pubRepository.save(pub)
  }
}
