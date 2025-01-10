import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseInterceptors,
  Get,
  Body,
  UploadedFile,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpfileService } from './expfile.service';
import { CreateExpfileDto } from './dto/create-expfile.dto';

import { FileUploadDto } from 'src/common/file-upload.dto';
import { diskStorage } from 'multer';

@Controller('expfile')
export class ExpfileController {
  constructor(private readonly expfileService: ExpfileService) {}

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
  async uploadEnvCardFile(
    @Body() data: CreateExpfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.file_name = file.originalname;
    return this.expfileService.createCardFile(data);
  }

  @Get(':user')
  async getEnvCard(@Param('user') user: number) {
    return this.expfileService.getExpFile(user);
  }

  @Delete(':user')
  async deleteEnvCard(@Param('user') user: number) {
    return this.expfileService.deleteCardFile(user);
  }
}
