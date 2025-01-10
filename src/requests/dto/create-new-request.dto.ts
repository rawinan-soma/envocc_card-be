import { IsNumber } from 'class-validator';

export class CreateNewRequestDto {
  @IsNumber()
  user: number;

  @IsNumber()
  request_status: number;

  @IsNumber()
  request_type: number;
}
