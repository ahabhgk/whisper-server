import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateIssueDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsString()
  readonly tag: string;
}
