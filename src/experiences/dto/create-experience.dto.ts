import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsString } from 'class-validator';

export class CreateExperienceDto {
  // @IsNumber()
  // @Type(() => Number)
  user?: number;

  @IsDate()
  @Type(() => Date)
  exp_fdate: Date;

  @IsDate()
  @Type(() => Date)
  exp_ldate: Date;

  @IsNumber()
  @Type(() => Number)
  exp_typeoffice: number;

  @IsString()
  exp_office: string;

  @IsString()
  exp_position: string;

  @IsString()
  exp_work: string;

  // @IsNumber()
  // @Type(() => Number)
  exp_years?: number;
}
