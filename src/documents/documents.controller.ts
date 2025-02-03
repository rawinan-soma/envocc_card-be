import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiConsumes, ApiBody } from '@nestjs/swagger';

import { FilesService } from 'src/files/files.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import { UserCookieGuard } from 'src/user-auth/user-cookie.guard';
import { MinioService } from 'src/minio/minio.service';
import { Response } from 'express';
// import { UserLocalCredentialGuard } from 'src/user-auth/user-local-credential.guard';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly minioService: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'document',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async insertDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateDocumentDto,
  ) {
    // TODO: Apply for all file type
    // TODO: check duplicate file name in all service
    // let data: CreateDocumentDto;

    const uploadedFile = await this.minioService.uploadFileToBucket(file);
    data.url = uploadedFile.url;
    data.doc_name = uploadedFile.fileName;
    return this.documentsService.createDocument(data);
  }

  // @Roles(UserRole.admin)
  @Get()
  // @UseGuards(UserCookieGuard)
  // admin
  async getAllDocuments() {
    return this.documentsService.getAllDocuments();
  }

  @Get(':doc_id')
  async getOneDocument(@Param('doc_id') doc_id: number) {
    const fileName = (await this.documentsService.getOneDocument(doc_id)).url;

    return fileName;
  }

  // admin
  @Delete(':doc_id')
  async deleteDocument(@Param('doc_id') doc_id: number) {
    const file = await this.documentsService.getOneDocument(doc_id);
    await this.documentsService.deleteDocument(file.doc_id);
    await this.minioService.deleteDocument(file.doc_name);

    return { msg: 'deleted' };
  }
}
