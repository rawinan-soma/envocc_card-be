import { Module } from '@nestjs/common';
import { ExpfileService } from './expfile.service';
import { ExpfileController } from './expfile.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MinioModule],
  controllers: [ExpfileController],
  providers: [
    ExpfileService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'exp' },
    {
      provide: MinioService,
      useFactory: (configService: ConfigService) =>
        new MinioService('exp', configService),
      inject: [ConfigService],
    },
  ],
})
export class ExpfileModule {}
