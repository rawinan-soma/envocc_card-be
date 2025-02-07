import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Req,
  Get,
  Param,
  Delete,
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
    const data: CreateGovcardDto = new CreateGovcardDto();
    data.user = 13;
    data.file_name = fileUrl.fileName;
    data.url = fileUrl.url;

    return this.govcardService.createGovCard(data);
  }

  @Get(':user')
  async getGovCard(@Param() user: number) {
    return (await this.govcardService.getGovCardfile(user)).url;
  }

  @Delete(':user')
  async deleteGovCard(@Param() user_id: number) {
    const file = await this.govcardService.getGovCardfile(user_id);
    await this.govcardService.deleteGovCard(user_id);
    await this.minio.deleteDocument(file.file_name);
  }
}
