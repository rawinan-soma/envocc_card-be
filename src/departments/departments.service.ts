import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getOneDepartment(ministry: number) {
    try {
      const department = await this.prismaService.departments.findMany({
        where: { ministry: ministry },
      });

      if (!department) {
        throw new NotFoundException('Not found department in this ministry');
      }

      return department;
    } catch (error: any) {
      this.logger.error('ERROR: getOneDepartment');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
