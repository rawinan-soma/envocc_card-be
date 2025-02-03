import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGovcardDto } from './dto/create-govcard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import * as fs from 'fs';
import { randomFilename } from 'src/common/randomFilename';

@Injectable()
export class GovcardService {
  private readonly logger = new Logger(GovcardService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getGovCardfile(user: number) {
    try {
      const govCard = await this.prismaService.gov_card_files.findFirst({
        where: { user: user },
        orderBy: { create_date: 'desc' },
      });

      if (!govCard) {
        throw new NotFoundException('Not found card file');
      }

      return govCard;
    } catch (error: any) {
      this.logger.error('ERROR: getGovCardFile');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async deleteGovCard(user: number) {
    try {
      const selectedFile = await this.getGovCardfile(user);

      return await this.prismaService.gov_card_files.delete({
        where: { gov_card_file_id: selectedFile.gov_card_file_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteGovCard');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async createGovCard(data: CreateGovcardDto) {
    try {
      const existingFile = await this.prismaService.gov_card_files.findFirst({
        where: { file_name: data.file_name },
      });

      if (!existingFile) {
        return await this.prismaService.gov_card_files.create({ data: data });
      } else {
        let isFileNameUnique: boolean = false;
        while (!isFileNameUnique) {
          data.file_name = randomFilename();

          const existingFile =
            await this.prismaService.gov_card_files.findFirst({
              where: { file_name: data.file_name },
            });

          if (!existingFile) {
            isFileNameUnique = true;
          }
        }

        return await this.prismaService.gov_card_files.create({ data: data });
      }
    } catch (error: any) {
      this.logger.error('ERROR: createGovCard');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
