import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Pub } from 'src/pub/entities/pub.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Pub) private readonly pubRepository: Repository<Pub>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const users = await this.userRepository.find({
      relations: [],
      skip: offset,
      take: limit,
    });
    return users.map(this.filterUserPassword);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['issues', 'likeIssues'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.filterUserPassword(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.filterUserPassword(await this.userRepository.save(user));
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const oldUser = await this.userRepository.findOne({ email });
    if (oldUser) {
      throw new BadRequestException(
        'The email used by the user already exists',
      );
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.filterUserPassword(await this.userRepository.save(newUser));
  }

  async findOwnedPubs(id: number) {
    const founder = await this.findOne(id);
    return this.pubRepository.find({ founder });
  }

  filterUserPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
}
