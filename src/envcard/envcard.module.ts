import { Module } from '@nestjs/common';
import { EnvcardService } from './envcard.service';
import { EnvcardController } from './envcard.controller';
import { MinioService } from 'src/minio/minio.service';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [MinioModule],
  controllers: [EnvcardController],
  providers: [
    EnvcardService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'envcard' },
  ],
})
export class EnvcardModule {}
