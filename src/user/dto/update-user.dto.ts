import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'img url' })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
