import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateGovcardDto } from './dto/create-govcard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { MinioService } from 'src/minio/minio.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GovcardService {
  private readonly logger = new Logger(GovcardService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly minio: MinioService,
  ) {
    // console.log(
    //   `Injected MinioService in GovCardService: ${minio['bucketName']}`,
    // );
  }

  async transactionCreateGovCard(
    tx: Prisma.TransactionClient,
    gov: Express.Multer.File,
    user: number,
  ) {
    let govFilename: string | null = null;
    try {
      const uploadGov = await this.minio.uploadFileToBucket(gov);
      console.log('Upload Gov File');
      console.log(uploadGov.url);

      govFilename = uploadGov?.fileName;

      const govData: CreateGovcardDto = new CreateGovcardDto();
      govData.user = user;
      govData.file_name = uploadGov.fileName;
      govData.url = uploadGov.url;
      console.log('Create Metadata: Gov Card');
      return await tx.gov_card_files.create({ data: govData });
    } catch (error) {
      const govFileExisted = await this.minio.getFileFromBucket(govFilename);
      if (govFileExisted) {
        await this.minio.deleteDocument(govFilename);
        console.log('Gov File Existed -> removed');
      }
      console.log(error);
      throw new BadRequestException('Error Upload Gov Card File');
    }
  }
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
      return await this.prismaService.gov_card_files.create({ data: data });
    } catch (error: any) {
      this.logger.error('ERROR: createGovCard');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
