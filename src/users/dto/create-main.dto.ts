import { ValidateNested, IsDate, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

class CreateExpWithUserDto {
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
}

export class CreateMainDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ValidateNested({ each: true })
  @Type(() => CreateExpWithUserDto)
  experiences: CreateExpWithUserDto[];
}
