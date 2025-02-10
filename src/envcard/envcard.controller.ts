import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EnvcardService } from './envcard.service';
import { CreateEnvcardDto } from './dto/create-envcard.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
// import LogInRequest from 'src/user-auth/log-in-request.interface';

@UseGuards(AdminCookieGuard)
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
    @UploadedFile() file: Express.Multer.File,
    @Body('user', ParseIntPipe) user: number,
  ) {
    // FIXME: user after allocate authen guard
    const data: CreateEnvcardDto = new CreateEnvcardDto();

    const fileUrl = await this.minioService.uploadFileToBucket(file);
    data.user = user;
    data.file_card_name = fileUrl.fileName;
    data.url = fileUrl.url;
    return this.envcardService.createCardFile(data);
  }

  @Get(':user_id')
  async getEnvCard(@Param('user_id', ParseIntPipe) user_id: number) {
    return (await this.envcardService.getCardFile(user_id)).url;
  }

  @Delete(':user_id')
  async deleteEnvCard(@Param('user_id', ParseIntPipe) user_id: number) {
    const file = await this.envcardService.getCardFile(user_id);
    await this.minioService.deleteDocument(file.file_card_name);
    await this.envcardService.deleteCardFile(user_id);

    return { msg: 'deleted' };
  }
}
