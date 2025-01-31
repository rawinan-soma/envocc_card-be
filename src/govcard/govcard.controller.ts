import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { CreateGovcardDto } from './dto/create-govcard.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
// import LogInRequest from 'src/user-auth/log-in-request.interface';
import { randomFilename } from 'src/common/randomFilename';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';

@Controller('govCards')
export class GovcardController {
  constructor(
    private readonly govcardService: GovcardService,
    private readonly minio: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'govCard',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async uploadGovCardFile(
    // @Body() data: CreateGovcardDto,
    @UploadedFile() file: Express.Multer.File,
    // @Req() req: LogInRequest,
  ) {
    const fileUrl = await this.minio.uploadFileToBucket(file);
    // FIXME: use after authen guard
    let data: CreateGovcardDto;
    data.user = 1;
    data.file_name = fileUrl;

    return this.govcardService.createGovCard(data);
  }

  @Get(':user')
  async getGovCard(@Param() user: number) {
    return this.govcardService.getGovCardfile(user);
  }
}
