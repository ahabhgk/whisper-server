import { IsBoolean, IsString } from 'class-validator';

export class CreatePubDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  private: boolean;
}
