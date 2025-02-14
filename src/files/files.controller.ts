import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  Body,
  ParseIntPipe,
  UploadedFiles,
} from '@nestjs/common';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import { FilesService } from './files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './files.service';

@UseGuards(AdminCookieGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly upload: UploadService) {}

  @Post('/upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'requestFile', maxCount: 1 },
        { name: 'govCard', maxCount: 1 },
        { name: 'expFile', maxCount: 1 },
      ],
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024, // 10MB per file
      }),
    ),
  )
  async transactionUploadFilesAndRequestUpdate(
    @UploadedFiles()
    files: {
      requestFile: Express.Multer.File[];
      govCard: Express.Multer.File[];
      expFile: Express.Multer.File[];
    },
    @Body('user', ParseIntPipe) user: number,
  ) {
    return this.upload.transactionUploadAndUpdateRequest(
      files.requestFile?.[0],
      files.govCard?.[0],
      files.expFile?.[0],
      user,
    );
  }
}
