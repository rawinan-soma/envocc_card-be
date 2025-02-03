import { Module } from '@nestjs/common';
import { RequestFileController } from './request-file.controller';
import { RequestFileServices } from './request-file.service';
import { MinioService } from 'src/minio/minio.service';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [MinioModule],
  controllers: [RequestFileController],
  providers: [
    RequestFileServices,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'requestfile' },
  ],
})
export class RequestFileModule {}
