import { IsNumber, IsString } from 'class-validator';

export class CreateSignPersonDto {
  @IsString()
  sign_person_pname: string;

  @IsString()
  sign_person_name: string;

  @IsString()
  sign_person_lname: string;

  @IsString()
  signature_pix?: string;

  @IsNumber()
  department: number;

  @IsString()
  position: string;
}
