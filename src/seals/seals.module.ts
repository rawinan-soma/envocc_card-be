import { Module } from '@nestjs/common';
import { SealsService } from './seals.service';
import { SealsController } from './seals.controller';
import { FilesService } from 'src/files/files.service';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [SealsController],
  providers: [
    SealsService,
    FilesService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'seal' },
  ],
})
export class SealsModule {}
