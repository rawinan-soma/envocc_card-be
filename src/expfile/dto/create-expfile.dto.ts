import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateExpfileDto {
  @IsNumber()
  @Type(() => Number)
  user: number;

  @IsString()
  file_name: string;

  url: string;
}
