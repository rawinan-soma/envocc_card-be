import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  @Type(() => Number)
  user: number;

  @Type(() => Number)
  signer: number;
}
