import { Module, forwardRef } from '@nestjs/common';
import { RequestFileController } from './request-file.controller';
import { RequestFileServices } from './request-file.service';
import { MinioService } from 'src/minio/minio.service';
import { MinioModule } from 'src/minio/minio.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => MinioModule)],
  controllers: [RequestFileController],
  providers: [
    RequestFileServices,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'requestfile' },
    // {
    //   provide: MinioService,
    //   useFactory: (configService: ConfigService) =>
    //     new MinioService('requestfile', configService),
    //   inject: [ConfigService],
    // },
    // { provide: MinioService, useExisting: MinioService },
  ],
  exports: [RequestFileServices],
})
export class RequestFileModule {}
