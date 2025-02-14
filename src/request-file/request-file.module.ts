import { Module } from '@nestjs/common';
import { RequestFileController } from './request-file.controller';
import { RequestFileServices } from './request-file.service';
import { MinioService } from 'src/minio/minio.service';
import { MinioModule } from 'src/minio/minio.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MinioModule],
  controllers: [RequestFileController],
  providers: [
    RequestFileServices,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'requestfile' },
    {
      provide: MinioService,
      useFactory: (configService: ConfigService) =>
        new MinioService('requestfile', configService),
      inject: [ConfigService],
    },
  ],
})
export class RequestFileModule {}
