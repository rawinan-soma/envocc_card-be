import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';
import { ThaiNamePrefix } from '../../users/users.enum';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  institution: number;

  @IsNumber()
  level: number;

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
  @Matches(/^0[0-9]{8}$/, { message: 'Invalid work number' })
  work_number: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  position: number;

  @IsNumber()
  position_lv: number;
}
