import { Module } from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { GovcardController } from './govcard.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MinioModule],
  controllers: [GovcardController],
  providers: [
    GovcardService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'govcard' },
    // {
    //   provide: MinioService,
    //   useFactory: (configService: ConfigService) =>
    //     new MinioService('govcard', configService),
    //   inject: [ConfigService],
    // },
  ],
  exports: [GovcardService],
})
export class GovcardModule {}
