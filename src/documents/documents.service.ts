import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as fs from 'fs';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDocuments() {
    try {
      const documents = await this.prismaService.documents.findMany({
        select: {
          doc_name: true,
          doc_type: true,
          // doc_file: true,
        },
      });

      return documents;
    } catch (error: any) {
      this.logger.error('ERROR: getAllDocuments');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getOneDocument(doc_id: number) {
    try {
      const document = await this.prismaService.documents.findUnique({
        where: { doc_id: doc_id },
        select: {
          doc_type: true,
          doc_name: true,
          // doc_file: true,
        },
      });

      if (!document) {
        throw new NotFoundException('This document did not existed');
      }
      return document;
    } catch (error: any) {
      this.logger.error('ERROR: getOneDocument');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createDocument(data: CreateDocumentDto) {
    try {
      return await this.prismaService.documents.create({
        data: data,
      });
    } catch (error: any) {
      this.logger.error('ERROR: createDocument');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async deleteDocument(doc_id: number) {
    try {
      const existedDocument = await this.prismaService.documents.findUnique({
        where: { doc_id: doc_id },
      });

      if (!existedDocument) {
        throw new NotFoundException('This document did not occurred');
      }

      fs.unlinkSync(existedDocument.doc_name);

      return await this.prismaService.documents.delete({
        where: { doc_id: doc_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteDocument');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
