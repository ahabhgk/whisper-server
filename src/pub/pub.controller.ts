import { Body, Controller, Post } from '@nestjs/common';
import { CreatePubDto } from './dto/create-pub.dto';
import { PubService } from './pub.service';

@Controller('pub')
export class PubController {
  constructor(private readonly pubService: PubService) {}

  @Post()
  create(@Body() createPubDto: CreatePubDto) {
    return this.pubService.create(1, createPubDto);
  }
}
