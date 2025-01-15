import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExpsfileService } from './expsfile.service';
import { CreateExpsfileDto } from './dto/create-expsfile.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import LogInRequest from 'src/admin-auth/log-in-request.interface';

@Controller('expsFile')
export class ExpsfileController {
  constructor(private readonly expsfileService: ExpsfileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets',
      }),
    }),
  )
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  async uploadExpsFile(
    @Req() req: LogInRequest,
    @Body()
    data: CreateExpsfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.exp_file = file.originalname;
    data.admin = req.user.admin_id;

    return this.expsfileService.createExpsFile(data);
  }

  @Get(':admin')
  async getExpsFile(@Param('admin') admin: number) {
    return this.expsfileService.getAllFilesOneAdmins(admin);
  }

  @Delete(':experiences_file_id')
  async deleteExpsFile(
    @Param('experiences_file_id') experiences_file_id: number,
  ) {
    return this.expsfileService.deleteExpsFile(experiences_file_id);
  }
}
