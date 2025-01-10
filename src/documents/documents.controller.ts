import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/common/admin-auth-guard.guard';
import { CookieAuthGuard } from 'src/common/cookie-auth.guard';
import { UserRole } from 'src/common/user-roles';
import { Roles } from '../common/user-roles-decorator';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets',
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateDocumentDto,
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async insertDocument(
    @Body() data: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.doc_name = Math.floor(100000 + Math.random() * 900000).toString();
    return this.documentsService.createDocument(data);
  }

  @Get()
  async getAllDocuments() {
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
