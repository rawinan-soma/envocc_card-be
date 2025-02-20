import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { EnvcardModule } from 'src/envcard/envcard.module';

import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [EnvcardModule, MinioModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
