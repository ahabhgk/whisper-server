import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Pub } from '../pub/entities/pub.entity';
import { User } from '../user/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Issue } from './entities/issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Pub) private readonly pubRepository: Repository<Pub>,
  ) {}

  async create(
    pubId: string,
    username: string,
    createIssueDto: CreateIssueDto,
  ) {
    const issue = this.issueRepository.create(createIssueDto);
    issue.pub = await this.pubRepository.findOne(pubId);
    issue.author = await this.userRepository.findOne(username);
    return this.issueRepository.save(issue);
  }

  async findRecent(paginationQueryDto: PaginationQueryDto, username?: string) {
    const { limit, offset } = paginationQueryDto;
    const recentIssues = await this.issueRepository.find({
      relations: ['author', 'likers', 'pub', 'pub.users'],
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
    const userRecentIssues = recentIssues.filter(i =>
      username
        ? i.pub.users.some(u => u.username === username)
        : !i.pub.private,
    );
    return userRecentIssues.map(issue => ({
      ...issue,
      likers: undefined,
      likeNumber: issue.likers.length,
    }));
  }

  async search(keyword: string) {
    const likeStr = Like(`%${keyword}%`);
    const byTitleResults = await this.issueRepository.find({ title: likeStr });
    const byContentResults = await this.issueRepository.find({
      content: likeStr,
    });
    return [...byTitleResults, ...byContentResults];
  }
}
