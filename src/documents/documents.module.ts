import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [FilesModule, MinioModule],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    FilesService,
    MinioService,
    {
      provide: 'MINIO_BUCKET_NAME',
      useValue: 'document',
    },
  ],
})
export class DocumentsModule {}
