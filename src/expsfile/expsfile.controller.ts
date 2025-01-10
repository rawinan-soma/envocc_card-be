import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ExpsfileService } from './expsfile.service';
import { CreateExpsfileDto } from './dto/create-expsfile.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';

@Controller('expsfile')
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
    @Body() data: CreateExpsfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.exp_file = file.originalname;

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
