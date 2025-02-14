import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReqFileDto } from './dto/request-file.dto';
import { MinioService } from 'src/minio/minio.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestFileServices {
  private readonly logger = new Logger(RequestFileServices.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {
    console.log(
      `Injected MinioService in RequestFileServices: ${minio['bucketName']}`,
    );
    console.trace();
  }

  async transactionCreateReqFile(
    tx: Prisma.TransactionClient,
    reqFile: Express.Multer.File,
    user: number,
  ) {
    let reqFileName: string | null = null;
    try {
      const uploadReqFile = await this.minio.uploadFileToBucket(reqFile);
      console.log('Upload Request File');
      console.log(uploadReqFile.url);
      reqFileName = uploadReqFile.fileName;

      const reqFileData: CreateReqFileDto = new CreateReqFileDto();
      reqFileData.user = user;
      reqFileData.file_name = uploadReqFile.fileName;
      reqFileData.url = uploadReqFile.url;

      console.log('Create Metadata Request File');
      return await tx.request_files.create({ data: reqFileData });
    } catch (error) {
      const reqFileExisted = await this.minio.getFileFromBucket(reqFileName);

      if (reqFileExisted) {
        await this.minio.deleteDocument(reqFileName);
        console.log('Request file existed -> removed');
      }

      console.log(error);
      throw new BadRequestException('Error uploading Request file');
    }
  }

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
