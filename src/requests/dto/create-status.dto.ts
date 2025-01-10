import { IsNumber, IsString } from 'class-validator';

export class createStatusDto {
  @IsNumber()
  user: number;
  @IsNumber()
  current_status: number;
  @IsNumber()
  next_status: number;
  @IsNumber()
  request_type: number;
  @IsString()
  description?: string;
}
