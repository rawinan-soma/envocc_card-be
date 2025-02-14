import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateEnvcardDto {
  @IsNumber()
  @Type(() => Number)
  user: number;

  @IsString()
  file_card_name: string;

  url: string;
}
