import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { CreateGovcardDto } from './dto/create-govcard.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('govCards')
export class GovcardController {
  constructor(private readonly govcardService: GovcardService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets',
      }),
    }),
  )
  @ApiBody({
    type: FileUploadDto,
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadGovCardFile(
    @Body() data: CreateGovcardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // data.filename = file.originalname;

    return this.govcardService.createGovCard(data);
  }
}
