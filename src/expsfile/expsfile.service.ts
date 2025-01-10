import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateExpsfileDto } from './dto/create-expsfile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import * as fs from 'fs';

@Injectable()
export class ExpsfileService {
  private readonly logger = new Logger(ExpsfileService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getAllFilesOneAdmins(admin: number) {
    try {
      const expsFile = await this.prismaService.experiences_files.findMany({
        where: { admin: admin },
        orderBy: { create_date: 'desc' },
      });

      if (!expsFile) {
        throw new NotFoundException('Not found exps File for this admin');
      }

      return expsFile;
    } catch (error: any) {
      this.logger.error('ERROR: getAllFiles');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async createExpsFile(data: CreateExpsfileDto) {
    try {
      return await this.prismaService.experiences_files.create({ data: data });
    } catch (error: any) {
      this.logger.error('ERROR: createExpsFile');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async deleteExpsFile(experience_file_id: number) {
    try {
      const selectedFile = await this.prismaService.experiences_files.findFirst(
        { where: { experience_file_id: experience_file_id } },
      );

      fs.unlinkSync(selectedFile.exp_file);

      return await this.prismaService.experiences_files.delete({
        where: { experience_file_id: selectedFile.experience_file_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteExpsFile');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
