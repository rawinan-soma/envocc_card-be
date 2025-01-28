import { Injectable, Logger } from '@nestjs/common';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PositionLvlsService {
  private readonly logger = new Logger(PositionLvlsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllLevels() {
    try {
      const levels = await this.prisma.position_lvs.findMany({
        where: { position_lv_id: { not: 99 } },
      });

      return levels;
    } catch (error: any) {
      this.logger.error('ERROR: getAllLevels');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async getOneLevel(level_id: number) {
    try {
      const level = await this.prisma.position_lvs.findUnique({
        where: { position_lv_id: level_id },
      });

      return level;
    } catch (error: any) {
      this.logger.error('ERROR: getOneLevel');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
