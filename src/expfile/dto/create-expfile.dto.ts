import { IsString, IsNumber } from 'class-validator';

export class CreateExpfileDto {
  @IsNumber()
  user: number;

  @IsString()
  file_name: string;
}
