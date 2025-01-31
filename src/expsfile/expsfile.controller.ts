import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExpsfileService } from './expsfile.service';
import { CreateExpsfileDto } from './dto/create-expsfile.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
// import LogInRequest from 'src/admin-auth/log-in-request.interface';
import { randomFilename } from 'src/common/randomFilename';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';

@Controller('expsFile')
export class ExpsfileController {
  constructor(
    private readonly expsfileService: ExpsfileService,
    private readonly minio: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'expsFile',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async uploadExpsFile(
    // @Req() req: LogInRequest,
    // FIXME: delete in prod
    // @Body()
    // data: CreateExpsfileDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // FIXME: use after allocate authen guard
    let data: CreateExpsfileDto;
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.admin = 1;
    data.exp_file = fileUrl;

    return this.expsfileService.createExpsFile(data);
  }

  @Get(':admin')
  async getExpsFile(@Param('admin') admin: number) {
    return this.expsfileService.getAllFilesOneAdmins(admin);
  }

  @Delete(':experiences_file_id')
  async deleteExpsFile(
    @Param('experiences_file_id') experiences_file_id: number,
  ) {
    return this.expsfileService.deleteExpsFile(experiences_file_id);
  }
}
