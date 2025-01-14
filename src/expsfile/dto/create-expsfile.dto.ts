import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateExpsfileDto {
  @IsNumber()
  @Type(() => Number)
  admin?: number;

  @IsString()
  exp_file?: string;
}
