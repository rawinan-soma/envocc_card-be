import { Injectable, Logger } from '@nestjs/common';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  private readonly logger = new Logger(InstitutionsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getOneInstitution(institution_name_th: string) {
    try {
      const institution = await this.prismaService.institutions.findMany({
        where: {
          institution_name_th: { contains: institution_name_th },
        },
        select: {
          institution_id: true,
          institution_name_th: true,
          departments: {
            select: {
              department_name_th: true,
              ministries: { select: { ministry_name_th: true } },
            },
          },
          epositions: {
            select: { eposition_name_th: true, eposition_id: true },
          },
        },
      });

      return institution;
    } catch (error: any) {
      this.logger.error('ERROR: getOneInstitution');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
