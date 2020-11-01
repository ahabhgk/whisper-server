import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const users = await this.userRepository.find({
      relations: [],
      skip: offset,
      take: limit,
    });
    return users;
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne(username, {
      relations: ['issues', 'likeIssues', 'pubs', 'ownedPubs'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      username,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save(user);
  }

  async create(username: string) {
    const oldUser = await this.userRepository.findOne(username);
    if (oldUser) {
      throw new BadRequestException('Username already exists');
    }
    const newUser = this.userRepository.create({ username });
    return this.userRepository.save(newUser);
  }
}
