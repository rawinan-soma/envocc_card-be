import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNumber()
  user: number;

  @IsNumber()
  member_no: number;

  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsString()
  qrcode: string;

  @IsString()
  qrcode_pass: string;

  @IsNumber()
  signer: number;
}
