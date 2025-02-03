import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { EnvcardService } from './envcard.service';
import { CreateEnvcardDto } from './dto/create-envcard.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { randomFilename } from 'src/common/randomFilename';
import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';
// import LogInRequest from 'src/user-auth/log-in-request.interface';

@Controller('envcard')
export class EnvcardController {
  constructor(
    private readonly envcardService: EnvcardService,
    private readonly minioService: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'envcard',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async uploadEnvCardFile(
    // @Body() data: CreateEnvcardDto,
    @UploadedFile() file: Express.Multer.File,
    // @Req() req: LogInRequest,
  ) {
    // FIXME: user after allocate authen guard
    let data: CreateEnvcardDto;
    // data.user = req.user.user_id;
    const fileUrl = await this.minioService.uploadFileToBucket(file);

    data.user = 1; // example user
    data.file_card_name = fileUrl.fileName;
    data.url = fileUrl.url;
    return this.envcardService.createCardFile(data);
  }

  @Get(':user_id')
  async getEnvCard(@Param('user_id') user_id: number) {
    return (await this.envcardService.getCardFile(user_id)).url;
  }

  @Delete(':user_id')
  async deleteEnvCard(@Param('user_id') user_id: number) {
    const file = await this.envcardService.getCardFile(user_id);
    await this.minioService.deleteDocument(file.file_card_name);
    await this.envcardService.deleteCardFile(user_id);

    return { msg: 'deleted' };
  }
}
