import { Module } from '@nestjs/common';
import { SignPersonService } from './sign-person.service';
import { SignPersonController } from './sign-person.controller';
import { MinioModule } from 'src/minio/minio.module';
import { MinioService } from 'src/minio/minio.service';

@Module({
  imports: [MinioModule],
  controllers: [SignPersonController],
  providers: [
    SignPersonService,
    MinioService,
    { provide: 'MINIO_BUCKET_NAME', useValue: 'signature' },
  ],
})
export class SignPersonModule {}
