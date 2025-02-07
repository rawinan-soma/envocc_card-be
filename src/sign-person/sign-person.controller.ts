import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SignPersonService } from './sign-person.service';
import { CreateSignPersonDto } from './dto/create-sign-person.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';

@Controller('sign-person')
export class SignPersonController {
  constructor(
    private readonly signPersonService: SignPersonService,
    private readonly minio: MinioService,
  ) {}

  @Get()
  async getAllSignPerson() {
    return await this.signPersonService.getAllSignPersons();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'signature',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.png'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async addSignPerson(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateSignPersonDto,
  ) {
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.signature_pix = fileUrl.fileName;
    data.url = fileUrl.url;
    return this.signPersonService.addSignPerson(data);
  }
}
