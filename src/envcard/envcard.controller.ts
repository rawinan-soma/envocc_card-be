import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EnvcardService } from './envcard.service';
import { CreateEnvcardDto } from './dto/create-envcard.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('envcard')
export class EnvcardController {
  constructor(private readonly envcardService: EnvcardService) {}

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
    @Body() data: CreateEnvcardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.file_card_name = file.path;
    return this.envcardService.createCardFile(data);
  }

  @Get(':user')
  async getEnvCard(@Param('user') user: number) {
    return this.envcardService.getCardFile(user);
  }

  @Delete(':user')
  async deleteEnvCard(@Param('user') user: number) {
    return this.envcardService.deleteCardFile(user);
  }
}
