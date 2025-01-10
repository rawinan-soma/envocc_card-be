import { Module } from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { GovcardController } from './govcard.controller';

@Module({
  controllers: [GovcardController],
  providers: [GovcardService],
})
export class GovcardModule {}
