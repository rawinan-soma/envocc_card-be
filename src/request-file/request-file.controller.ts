import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { RequestFileServices } from './request-file.service';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReqFileDto } from './dto/request-file.dto';

@Controller('request-file')
export class RequestFileController {
  constructor(
    private readonly requestFileService: RequestFileServices,
    private readonly minio: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'request-file',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  // user
  async createReqFile(@UploadedFile() file: Express.Multer.File) {
    let data: CreateReqFileDto;
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.user = 1;
    data.file_name = fileUrl.fileName;
    data.url = fileUrl.url;

    return this.requestFileService.createReqFile(data);
  }

  // admin
  @Get('user_id')
  async getReqFile(@Param() user_id: number) {
    return (await this.requestFileService.getReqFile(user_id)).url;
  }

  // admin
  @Delete(':user_id')
  async deleteReqFile(@Param() user_id: number) {
    const file = await this.requestFileService.getReqFile(user_id);
    await this.requestFileService.deleteReqFile(file.request_file_id);
    await this.minio.deleteDocument(file.file_name);

    return { msg: 'Deleted' };
  }
}
