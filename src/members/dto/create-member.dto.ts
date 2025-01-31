import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  user: number;
}
