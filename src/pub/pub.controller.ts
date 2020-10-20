import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreatePubDto } from './dto/create-pub.dto';
import { PubService } from './pub.service';

@Controller('pub')
export class PubController {
  constructor(private readonly pubService: PubService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@RequestUser() user: User, @Body() createPubDto: CreatePubDto) {
    return this.pubService.create(user.id, createPubDto);
  }
}
