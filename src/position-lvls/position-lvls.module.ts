import { Module } from '@nestjs/common';
import { PositionLvlsService } from './position-lvls.service';
import { PositionLvlsController } from './position-lvls.controller';

@Module({
  controllers: [PositionLvlsController],
  providers: [PositionLvlsService],
})
export class PositionLvlsModule {}
