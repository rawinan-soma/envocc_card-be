import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreatePhotoDto {
  @Type(() => Number)
  user: number;

  photo: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;
}
