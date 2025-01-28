import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class PositionsService {
  private readonly logger = new Logger(PositionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllPosition() {
    try {
      const positions = await this.prisma.positions.findMany({
        where: { position_id: { not: 99 } },
      });

      return positions;
    } catch (error: any) {
      this.logger.error('ERROR: getAllPositions');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async getPositionByID(position_id: number) {
    try {
      const position = await this.prisma.positions.findUnique({
        where: {
          position_id: position_id,
        },
      });

      return position;
    } catch (error: any) {
      this.logger.error('ERROR: getPositionByID');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
