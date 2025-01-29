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
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiConsumes, ApiBody } from '@nestjs/swagger';

import { FilesService } from 'src/files/files.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import { UserCookieGuard } from 'src/user-auth/user-cookie.guard';
// import { UserLocalCredentialGuard } from 'src/user-auth/user-local-credential.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'file',
      new FilesService().getMulterOptions({
        destination: 'src/documents/assets',
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

    console.log(file);
    data.doc_name = file.path;
    return this.documentsService.createDocument(data);
  }

  // @Roles(UserRole.admin)
  @Get()
  // @UseGuards(UserCookieGuard)
  async getAllDocuments() {
    console.log('FROM: DOCUMENTS');
    return this.documentsService.getAllDocuments();
  }

  @Get(':doc_id')
  async getOneDocument(@Param('doc_id') doc_id: number) {
    return this.documentsService.getOneDocument(doc_id);
  }

  @Delete(':doc_id')
  async deleteDocument(@Param('doc_id') doc_id: number) {
    return this.documentsService.deleteDocument(doc_id);
  }
}
