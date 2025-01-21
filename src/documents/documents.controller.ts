import LogInRequest from 'src/admin-auth/log-in-request.interface';

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
  Req,
  Res,
  Header,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

import { CookieAuthGuard } from 'src/common/cookie-auth.guard';
import { UserRole } from '../common/user-roles.enum';
import { Roles } from '../common/user-roles-decorator';
import { randomFilename } from 'src/common/randomFilename';

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
  async insertDocument(@UploadedFile() file: Express.Multer.File) {
    // TODO: Apply for all file type
    // TODO: check duplicate file name in all service
    let data: CreateDocumentDto;
    data.doc_type = 1;
    data.doc_name = randomFilename();
    return this.documentsService.createDocument(data);
  }

  @Get()
  @Roles(UserRole.admin)
  @UseGuards(CookieAuthGuard)
  async getAllDocuments(@Req() req: LogInRequest) {
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
