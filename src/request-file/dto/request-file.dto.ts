import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateReqFileDto {
  @IsNumber()
  @Type(() => Number)
  user: number;

  @IsString()
  file_name: string;

  @IsString()
  url: string;
}
