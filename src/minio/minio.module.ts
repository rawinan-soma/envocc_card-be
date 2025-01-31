import { Module, Global } from '@nestjs/common';
import { MinioService } from './minio.service';

@Global()
@Module({
  controllers: [],
  providers: [
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'default' },
  ],
  exports: [MinioService, 'MINIO_BUCKET_NAME'],
})
export class MinioModule {}
