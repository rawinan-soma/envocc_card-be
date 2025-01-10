import { IsNumber, IsString } from 'class-validator';

export class CreateEnvcardDto {
  @IsNumber()
  user: number;

  @IsString()
  file_card_name: string;
}
