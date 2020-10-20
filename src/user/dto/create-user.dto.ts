import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @Min(6)
  @Max(24)
  readonly password: string;
}
