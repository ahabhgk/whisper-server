import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/issue/entities/issue.entity';
import { Pub } from 'src/pub/entities/pub.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Issue, Pub])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
