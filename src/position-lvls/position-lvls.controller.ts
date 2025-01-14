import { Controller, Get, Param } from '@nestjs/common';
import { PositionLvlsService } from './position-lvls.service';

@Controller('position-lvls')
export class PositionLvlsController {
  constructor(private readonly positionLvlsService: PositionLvlsService) {}

  @Get()
  async getAllLevels() {
    return await this.positionLvlsService.getAllLevels();
  }

  @Get(':level_id')
  async getOneLevel(@Param('level_id') level_id: number) {
    return await this.positionLvlsService.getOneLevel(level_id);
  }
}
