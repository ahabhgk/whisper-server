import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: '搜索 pubs 和 issues' })
  @ApiOkResponse()
  @Get(':keyword')
  search(@Param('keyword') keyword: string) {
    return this.searchService.search(keyword);
  }
}
