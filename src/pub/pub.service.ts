import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreatePubDto } from './dto/create-pub.dto';
import { Pub } from './entities/pub.entity';

@Injectable()
export class PubService {
  constructor(
    @InjectRepository(Pub) private readonly pubRepository: Repository<Pub>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(username: string, createPubDto: CreatePubDto) {
    const { name } = createPubDto;
    const existed = await this.pubRepository.findOne({ name });
    if (existed) {
      throw new BadRequestException('The name used by the pub already exists');
    }
    const pub = this.pubRepository.create(createPubDto);
    console.log(pub);
    const user = await this.userRepository.findOne(username);
    pub.founder = user;
    await this.pubRepository.save(pub);
    return this.join(pub.id, username);
  }

  async join(pubId: string, username: string) {
    const user = await this.userRepository.findOne(username);
    const pub = await this.pubRepository.findOne(pubId, {
      relations: ['users', 'founder'],
    });
    if (pub.users.filter(u => u.username === username).length === 1) {
      return this.pubRepository.save(pub);
    }
    pub.users.push(user);
    return this.pubRepository.save(pub);
  }

  async exit(pubId: string, username: string) {
    const pub = await this.pubRepository.findOne(pubId, {
      relations: ['users', 'founder'],
    });
    pub.users = pub.users.filter(u => u.username !== username);
    return this.pubRepository.save(pub);
  }

  async search(keyword: string) {
    const likeStr = Like(`%${keyword}%`);
    const byNameResults = await this.pubRepository.find({ name: likeStr });
    const byDescriptionResults = await this.pubRepository.find({
      description: likeStr,
    });
    return [...byNameResults, ...byDescriptionResults];
  }
}
