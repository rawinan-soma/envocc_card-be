import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

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
    type: CreatePhotoDto,
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async insertPhoto(
    @Body() data: CreatePhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.file = file.originalname;

    return this.photosService.createPhoto(data);
  }

  @Get(':user_id')
  async getPhotoByUser(@Param('user_id') user_id: number) {
    return this.photosService.getPhotoByUser(user_id);
  }

  @Delete(':photo_id')
  async deletePhoto(@Param('photo_id') photo_id: number) {
    return this.photosService.deletePhoto(photo_id);
  }
}
