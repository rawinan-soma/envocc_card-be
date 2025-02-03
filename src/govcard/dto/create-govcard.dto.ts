import { IsString, IsNumber } from 'class-validator';

export class CreateGovcardDto {
  @IsNumber()
  user: number;

  @IsString()
  file_name: string;

  url: string;
}
