import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  @Length(1, 20)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @Length(8, 32)
  readonly password: string;
}
