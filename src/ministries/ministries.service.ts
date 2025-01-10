import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class MinistriesService {
  private readonly logger = new Logger(MinistriesService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getMinistries() {
    try {
      const ministries = await this.prismaService.ministries.findMany();
      return ministries;
    } catch (error: any) {
      this.logger.error('ERROR: getMinistries');
      console.log(error);

      serviceErrorHandler(error);
    }
  }
}
