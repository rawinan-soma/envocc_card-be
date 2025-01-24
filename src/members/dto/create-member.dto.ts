import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  user: number;

  @Type(() => Date)
  start_date?: Date;

  @IsNumber()
  signer?: number;

  @IsString()
  qrcode_pass?: string;
}
