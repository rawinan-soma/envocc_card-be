import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { SealsService } from './seals.service';
import { MinioService } from 'src/minio/minio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { CreateSealDto } from './dto/create-seal.dto';

@Controller('seals')
export class SealsController {
  constructor(
    private readonly sealsService: SealsService,
    private readonly minio: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'seal',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.png'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async insertSeal(
    @UploadedFile() file: Express.Multer.File,
    @Body() seal_name: string,
  ) {
    const data: CreateSealDto = new CreateSealDto();
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.seal_pix = fileUrl.fileName;
    data.url = fileUrl.url;
    data.update_admin = 1;
    data.seal_name = seal_name;

    return this.sealsService.createSeal(data);
  }
}
