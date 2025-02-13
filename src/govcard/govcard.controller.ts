import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { CreateGovcardDto } from './dto/create-govcard.dto';

import { FileInterceptor } from '@nestjs/platform-express';
// import LogInRequest from 'src/user-auth/log-in-request.interface';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';
import { UserCookieGuard } from 'src/user-auth/user-cookie.guard';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';

@UseGuards(AdminCookieGuard)
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
    @UploadedFile() file: Express.Multer.File,
    @Body('user', ParseIntPipe) user: number,
  ) {
    const fileUrl = await this.minio.uploadFileToBucket(file);
    const data: CreateGovcardDto = new CreateGovcardDto();
    data.user = user;
    data.file_name = fileUrl.fileName;
    data.url = fileUrl.url;

    return this.govcardService.createGovCard(data);
  }

  @Get(':user')
  async getGovCard(@Param('user', ParseIntPipe) user: number) {
    return (await this.govcardService.getGovCardfile(user)).url;
  }

  @Delete(':user')
  async deleteGovCard(@Param('user', ParseIntPipe) user_id: number) {
    const file = await this.govcardService.getGovCardfile(user_id);
    await this.govcardService.deleteGovCard(user_id);
    await this.minio.deleteDocument(file.file_name);
  }
}
