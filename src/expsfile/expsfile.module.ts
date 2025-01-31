import { Module } from '@nestjs/common';
import { ExpsfileService } from './expsfile.service';
import { ExpsfileController } from './expsfile.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [ExpsfileController],
  providers: [
    ExpsfileService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'exps' },
  ],
})
export class ExpsfileModule {}
