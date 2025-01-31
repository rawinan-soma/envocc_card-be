import { Module } from '@nestjs/common';
import { ExpfileService } from './expfile.service';
import { ExpfileController } from './expfile.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [ExpfileController],
  providers: [
    ExpfileService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'exp' },
  ],
})
export class ExpfileModule {}
