import { Module } from '@nestjs/common';
import { EnvcardService } from './envcard.service';
import { EnvcardController } from './envcard.controller';
import { ConfigService } from '@nestjs/config';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [EnvcardController],
  providers: [
    EnvcardService,
    {
      provide: MinioService,
      useFactory: (configService: ConfigService) =>
        new MinioService('envcard', configService),
      inject: [ConfigService],
    },
  ],
  exports: [EnvcardService],
})
export class EnvcardModule {}
