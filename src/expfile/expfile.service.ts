import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { CreateExpfileDto } from './dto/create-expfile.dto';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class ExpfileService {
  private readonly logger = new Logger(ExpfileService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getExpFile(user: number) {
    try {
      const envcard = await this.prismaService.exp_files.findFirst({
        where: { user: user },
        orderBy: { create_date: 'desc' },
      });

      if (!envcard) {
        throw new NotFoundException('Not found exp file for provided user');
      }

      return envcard;
    } catch (error: any) {
      this.logger.error('ERROR: getExpFile');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async deleteCardFile(user: number) {
    try {
      const selectedFile = await this.getExpFile(user);

      fs.unlinkSync(selectedFile.file_name);

      return await this.prismaService.exp_files.delete({
        where: { exp_file_id: selectedFile.exp_file_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteExpFile');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createCardFile(data: CreateExpfileDto) {
    try {
      return await this.prismaService.exp_files.create({ data: data });
    } catch (error: any) {
      this.logger.error('ERROR: createExpile');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
