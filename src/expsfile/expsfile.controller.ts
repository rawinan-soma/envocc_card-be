import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpsfileService } from './expsfile.service';
import { CreateExpsfileDto } from './dto/create-expsfile.dto';

import { FileInterceptor } from '@nestjs/platform-express';
// import LogInRequest from 'src/admin-auth/log-in-request.interface';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import AdminRequest from 'src/admin-auth/admin-request.interface';

@UseGuards(AdminCookieGuard)
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
    @UploadedFile()
    file: Express.Multer.File,
    @Req() request: AdminRequest,
  ) {
    const data: CreateExpsfileDto = new CreateExpsfileDto();
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.admin = request.admin.admin_id;
    data.exp_file = fileUrl.fileName;
    data.url = fileUrl.url;

    return this.expsfileService.createExpsFile(data);
  }

  @Get(':admin')
  async getExpsFile(@Param('admin', ParseIntPipe) admin: number) {
    return await this.expsfileService.getAllFilesOneAdmins(admin);
  }

  @Delete(':experiences_file_id')
  async deleteExpsFile(
    @Param('experiences_file_id', ParseIntPipe) experiences_file_id: number,
  ) {
    const file =
      await this.expsfileService.getExpsFileById(experiences_file_id);
    await this.minio.deleteDocument(file.exp_file);
    await this.expsfileService.deleteExpsFile(experiences_file_id);

    return { msg: 'deleted' };
  }
}
