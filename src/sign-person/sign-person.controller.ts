import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SignPersonService } from './sign-person.service';
import { CreateSignPersonDto } from './dto/create-sign-person.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';

@Controller('sign-person')
export class SignPersonController {
  constructor(private readonly signPersonService: SignPersonService) {}

  @Get()
  async getAllSignPerson() {
    return await this.signPersonService.getAllSignPersons();
  }

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
  async addSignPerson(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateSignPersonDto,
  ) {
    return this.signPersonService.addSignPerson(data);
  }
}
