import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnvcardDto } from './dto/create-envcard.dto';
import * as fs from 'fs';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { randomFilename } from 'src/common/randomFilename';

@Injectable()
export class EnvcardService {
  private readonly logger = new Logger(EnvcardService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getCardFile(user: number) {
    try {
      const envcard = await this.prismaService.envocc_card_files.findFirst({
        where: { user: user },
        orderBy: { create_date: 'desc' },
      });

      if (!envcard) {
        throw new NotFoundException(
          'Not found env card file for provided user',
        );
      }

      return envcard;
    } catch (error: any) {
      this.logger.error('ERROR: getCardFile');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async deleteCardFile(user: number) {
    try {
      const selectedFile = await this.getCardFile(user);

      return await this.prismaService.envocc_card_files.delete({
        where: { envocc_card_file_id: selectedFile.envocc_card_file_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteCardFile');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createCardFile(data: CreateEnvcardDto) {
    try {
      const existingFile = await this.prismaService.envocc_card_files.findFirst(
        {
          where: { file_card_name: data.file_card_name },
        },
      );

      if (!existingFile) {
        return await this.prismaService.envocc_card_files.create({
          data: data,
        });
      } else {
        let isFileNameUnique: boolean = false;
        while (!isFileNameUnique) {
          data.file_card_name = randomFilename();

          const existingFile =
            await this.prismaService.envocc_card_files.findFirst({
              where: { file_card_name: data.file_card_name },
            });

          if (!existingFile) {
            isFileNameUnique = true;
          }
        }

        return await this.prismaService.envocc_card_files.create({
          data: data,
        });
      }
    } catch (error: any) {
      this.logger.error('ERROR: createCardFile');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
