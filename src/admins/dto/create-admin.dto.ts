import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';
import { ThaiNamePrefix } from '../../users/users.enum';
import { Type } from 'class-transformer';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  @Type(() => Number)
  institution: number;

  @IsNumber()
  // @Type(() => Number)
  admin_level: number;

  @IsString()
  pname: ThaiNamePrefix;

  @IsString()
  fname: string;

  @IsString()
  lname: string;

  @IsString()
  @Matches(/^0[0-9]{9}$/, { message: 'Invalid private number' })
  private_number: string;

  @IsString()
  work_number: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  @Type(() => Number)
  position: number;

  @IsNumber()
  @Type(() => Number)
  position_lv: number;
}
