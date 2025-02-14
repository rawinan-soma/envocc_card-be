import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNumber()
  @Type(() => Number)
  user: number;

  @IsString()
  photo: string;

  @IsString()
  url: string;
}
