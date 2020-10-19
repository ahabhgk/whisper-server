import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { SearchDto } from 'src/common/dto/search.dto';
import { User } from 'src/user/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './entities/issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createIssueDto: CreateIssueDto) {
    const issue = this.issueRepository.create(createIssueDto);
    issue.author = await this.userRepository.findOne(userId);
    this.issueRepository.save(issue);
    return issue;
  }

  async findRecent(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    const recentIssues = await this.issueRepository.find({
      relations: ['author', 'likers'],
      order: { created: 'DESC' },
      skip: offset,
      take: limit,
    });
    return recentIssues.map(issue => ({
      ...issue,
      likers: undefined,
      likeNumber: issue.likers.length,
    }));
  }

  async search(searchDto: SearchDto) {
    const likeStr = Like(`%${searchDto.keyword}%`);
    const byTitleResults = await this.issueRepository.find({ title: likeStr });
    const byContentResults = await this.issueRepository.find({
      content: likeStr,
    });
    return byTitleResults.concat(byContentResults);
  }
}
