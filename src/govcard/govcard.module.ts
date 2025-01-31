import { Module } from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { GovcardController } from './govcard.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [GovcardController],
  providers: [
    GovcardService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'govcard' },
  ],
})
export class GovcardModule {}
