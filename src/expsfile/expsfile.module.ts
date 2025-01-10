import { Module } from '@nestjs/common';
import { ExpsfileService } from './expsfile.service';
import { ExpsfileController } from './expsfile.controller';

@Module({
  controllers: [ExpsfileController],
  providers: [ExpsfileService],
})
export class ExpsfileModule {}
