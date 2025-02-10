import {
  Controller,
  Post,
  UseInterceptors,
  Get,
  UploadedFile,
  Param,
  Delete,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpfileService } from './expfile.service';
import { CreateExpfileDto } from './dto/create-expfile.dto';

import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
// import LogInRequest from 'src/user-auth/log-in-request.interface';

@UseGuards(AdminCookieGuard)
@Controller('expFiles')
export class ExpfileController {
  constructor(
    private readonly expfileService: ExpfileService,
    private readonly minio: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'expFile',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async uploadEnvCardFile(
    @Body('user', ParseIntPipe) user: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data: CreateExpfileDto = new CreateExpfileDto();
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.user = user;
    data.file_name = fileUrl.fileName;
    data.url = fileUrl.url;
    return this.expfileService.createExpFile(data);
  }

  @Get(':user')
  async getEnvCard(@Param('user', ParseIntPipe) user: number) {
    return (await this.expfileService.getExpFile(user)).url;
  }

  @Delete(':user')
  async deleteEnvCard(@Param('user', ParseIntPipe) user: number) {
    const file = await this.expfileService.getExpFile(user);
    await this.expfileService.deleteExpFile(user);
    await this.minio.deleteDocument(file.file_name);
  }
}
