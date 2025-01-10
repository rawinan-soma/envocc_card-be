import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class ExperiencesService {
  private readonly logger = new Logger(ExperiencesService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getOneUserExps(user_id: number) {
    try {
      const exps = await this.prismaService.experiences.findMany({
        where: { user: user_id },
        orderBy: { exp_ldate: 'desc' },
      });

      return exps;
    } catch (error: any) {
      this.logger.error('ERROR: getOneUserExps');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async addExps(data: CreateExperienceDto) {
    try {
      return await this.prismaService.experiences.create({
        data: data,
      });
    } catch (error: any) {
      this.logger.error('ERROR: addExps');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async editExps(exp_id: number, data: UpdateExperienceDto) {
    try {
      const exps = await this.prismaService.experiences.findFirst({
        where: { exp_id: exp_id },
      });

      if (!exps) {
        throw new NotFoundException('No experiences');
      }

      return await this.prismaService.experiences.update({
        where: { exp_id },
        data: data,
      });
    } catch (error: any) {
      this.logger.error('ERROR: editExps');
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        serviceErrorHandler(error);
      }
    }
  }

  async deleteExps(exp_id: number) {
    try {
      const exps = await this.prismaService.experiences.findUnique({
        where: { exp_id: exp_id },
      });

      if (!exps) {
        throw new NotFoundException('No experience');
      }

      return await this.prismaService.experiences.delete({
        where: { exp_id: exp_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteExps');
      this.logger.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        serviceErrorHandler(error);
      }
    }
  }
}
