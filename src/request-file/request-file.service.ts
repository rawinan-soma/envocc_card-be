import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReqFileDto } from './dto/request-file.dto';

@Injectable()
export class RequestFileServices {
  private readonly logger = new Logger(RequestFileServices.name);

  constructor(private readonly prisma: PrismaService) {}

  async getReqFile(user_id: number) {
    try {
      const reqFile = await this.prisma.request_files.findFirst({
        where: { user: user_id },
        orderBy: { create_date: 'desc' },
      });

      return reqFile;
    } catch (error) {
      this.logger.error(RequestFileServices.name);
      serviceErrorHandler(error);
    }
  }

  async createReqFile(data: CreateReqFileDto) {
    try {
      return await this.prisma.request_files.create({ data: data });
    } catch (error) {
      this.logger.error(RequestFileServices.name);
      serviceErrorHandler(error);
    }
  }

  async deleteReqFile(reqFile_id: number) {
    try {
      const file = await this.prisma.request_files.findUnique({
        where: { request_file_id: reqFile_id },
      });

      if (!file) {
        throw new NotFoundException('Not found request file');
      }

      return await this.prisma.request_files.delete({
        where: { request_file_id: reqFile_id },
      });
    } catch (error) {
      this.logger.error(RequestFileServices.name);
      serviceErrorHandler(error);
    }
  }
}
