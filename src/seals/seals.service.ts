import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSealDto } from './dto/create-seal.dto';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class SealsService {
  private readonly logger = new Logger(SealsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createSeal(data: CreateSealDto) {
    try {
      return await this.prisma.seals.create({ data: data });
    } catch (error) {
      this.logger.error('ERROR: createSeal');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async getSealById(seal_id: number) {
    try {
      const seal = await this.prisma.seals.findUnique({
        where: { seal_id: seal_id },
      });

      return seal;
    } catch (error) {
      this.logger.error('ERROR: getSealById');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
