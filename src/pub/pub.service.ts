import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePubDto } from './dto/create-pub.dto';
import { Pub } from './entities/pub.entity';

@Injectable()
export class PubService {
  constructor(
    @InjectRepository(Pub) private readonly pubRepository: Repository<Pub>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createPubDto: CreatePubDto) {
    const { name } = createPubDto;
    const existed = await this.pubRepository.findOne({ name });
    if (existed) {
      throw new BadRequestException('The name used by the pub already exists');
    }
    const pub = this.pubRepository.create(createPubDto);
    pub.founder = await this.userRepository.findOne(userId);
    return this.pubRepository.save(pub);
  }
}
