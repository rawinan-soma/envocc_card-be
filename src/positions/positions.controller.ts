import { Controller, Get, Param } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async getAllPositions() {
    return await this.positionsService.getAllPosition();
  }

  @Get(':position_id')
  async getOnePosition(@Param('position_id') position_id: number) {
    console.log(position_id);
    return await this.positionsService.getPositionByID(position_id);
  }
}
