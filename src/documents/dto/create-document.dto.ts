import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @Type(() => Number)
  doc_type: number;

  doc_name: string;

  doc_file: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;
}
