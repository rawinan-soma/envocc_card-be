import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignPersonService } from './sign-person.service';
import { CreateSignPersonDto } from './dto/create-sign-person.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from 'src/minio/minio.service';
import { FilesService } from 'src/files/files.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import AdminRequest from 'src/admin-auth/admin-request.interface';

@UseGuards(AdminCookieGuard)
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
    @Req() request: AdminRequest,
  ) {
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.signature_pix = fileUrl.fileName;
    data.url = fileUrl.url;
    data.update_admin = request.admin.admin_id;
    return this.signPersonService.addSignPerson(data);
  }
}
