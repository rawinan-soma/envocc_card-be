import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [PhotosController],
  providers: [
    PhotosService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'photo' },
  ],
})
export class PhotosModule {}
