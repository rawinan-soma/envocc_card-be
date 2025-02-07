import { IsNumber, IsString } from 'class-validator';

export class CreateSealDto {
  @IsNumber()
  update_admin: number;

  @IsString()
  seal_pix: string;

  url: string;

  seal_name: string;
}
