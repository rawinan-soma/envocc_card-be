import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreatePhotoDto {
  user: number;

  photo: string;
}
