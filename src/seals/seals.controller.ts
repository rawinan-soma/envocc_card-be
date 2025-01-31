import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
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
  async insertSeal(@UploadedFile() file: Express.Multer.File) {
    let data: CreateSealDto;
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.seal_pix = fileUrl;
    data.update_admin = 1;

    return this.sealsService.createSeal(data);
  }
}
