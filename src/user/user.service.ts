import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.userRepository.find({
      relations: [],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['issues', 'likeIssues'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const oldUser = await this.userRepository.findOne({ email });
    if (oldUser) {
      throw new BadRequestException(
        `The email used by the user ${email} already exists`,
      );
    }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
}
