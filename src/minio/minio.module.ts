import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'default' },
    {
      provide: 'MINIO_ENDPOINT',
      useFactory: (configService: ConfigService) =>
        configService.get('MINIO_ENDPOINT'),
      inject: [ConfigService],
    },
  ],
  exports: [MinioService, 'MINIO_BUCKET_NAME', 'MINIO_ENDPOINT'],
})
export class MinioModule {}
