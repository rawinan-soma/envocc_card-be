import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseInterceptors,
  Get,
  UploadedFile,
  Param,
  Delete,
  Req,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpfileService } from './expfile.service';
import { CreateExpfileDto } from './dto/create-expfile.dto';

import { FileUploadDto } from 'src/common/file-upload.dto';
import { diskStorage } from 'multer';
import { randomFilename } from 'src/common/randomFilename';
import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';
// import LogInRequest from 'src/user-auth/log-in-request.interface';

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
    // @Body() data: CreateExpfileDto,
    @UploadedFile() file: Express.Multer.File,
    // @Req() req: LogInRequest,
  ) {
    // FIXME: use after allocate authen guard in full test and prod stage
    const data: CreateExpfileDto = new CreateExpfileDto();
    const fileUrl = await this.minio.uploadFileToBucket(file);
    // data.user = req.user.user_id;
    data.file_name = fileUrl.fileName;
    data.url = fileUrl.url;
    data.user = 1;
    return this.expfileService.createExpFile(data);
  }

  @Get(':user')
  async getEnvCard(@Param('user') user: number) {
    return (await this.expfileService.getExpFile(user)).url;
  }

  @Delete(':user')
  async deleteEnvCard(@Param('user') user: number) {
    const file = await this.expfileService.getExpFile(user);
    await this.expfileService.deleteExpFile(user);
    await this.minio.deleteDocument(file.file_name);
  }
}
