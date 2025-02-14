import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpfileDto } from './dto/create-expfile.dto';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { MinioService } from 'src/minio/minio.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpfileService {
  private readonly logger = new Logger(ExpfileService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly minio: MinioService,
  ) {
    console.log(
      `Injected MinioService in ExpfileService: ${minio['bucketName']}`,
    );
  }

  async transactionCreateExpFile(
    tx: Prisma.TransactionClient,
    exp: Express.Multer.File,
    user: number,
  ) {
    let expFileName: string | null = null;
    try {
      const uploadExp = await this.minio.uploadFileToBucket(exp);
      console.log('Upload Exp File');
      console.log(uploadExp.url);

      expFileName = uploadExp?.fileName;

      const expData: CreateExpfileDto = new CreateExpfileDto();
      expData.user = user;
      expData.file_name = uploadExp.fileName;
      expData.url = uploadExp.url;
      console.log('Create Metadata: Exp File');
      return await tx.exp_files.create({ data: expData });
    } catch (error) {
      const expFileExisted = await this.minio.getFileFromBucket(expFileName);

      if (expFileExisted) {
        await this.minio.deleteDocument(expFileName);
        console.log('EXP file existed -> removed');
      }

      console.log(error);
      throw new BadRequestException('Error uploading EXP Files');
    }
  }

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

  async deleteExpFile(user: number) {
    try {
      const selectedFile = await this.getExpFile(user);

      return await this.prismaService.exp_files.delete({
        where: { exp_file_id: selectedFile.exp_file_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteExpFile');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createExpFile(data: CreateExpfileDto) {
    try {
      return await this.prismaService.exp_files.create({ data: data });
    } catch (error: any) {
      this.logger.error('ERROR: createExpfile');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
