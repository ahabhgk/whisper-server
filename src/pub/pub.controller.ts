import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/auth/auth.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/decorators/user.decorator';
import { CreatePubDto } from './dto/create-pub.dto';
import { PubService } from './pub.service';

@Controller('pub')
export class PubController {
  constructor(private readonly pubService: PubService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @RequestUser() payload: JwtPayload,
    @Body() createPubDto: CreatePubDto,
  ) {
    return this.pubService.create(payload.username, createPubDto);
  }

  @Put(':pubId')
  @UseGuards(JwtAuthGuard)
  join(@Param('pubId') pubId: number, @RequestUser() payload: JwtPayload) {
    return this.pubService.join(pubId, payload.username);
  }
}
