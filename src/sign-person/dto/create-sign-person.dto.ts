import { IsNumber, IsString } from 'class-validator';

export class CreateSignPersonDto {
  @IsString()
  sign_person_pname: string;

  @IsString()
  sign_person_name: string;

  @IsString()
  sign_person_lname: string;

  signature_pix?: string;

  @IsString()
  position: string;

  @IsNumber()
  update_admin: number;

  @IsNumber()
  institution: number;

  url: string;
}
