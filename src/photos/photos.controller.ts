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
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly minio: MinioService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'photo',
      new FilesService().getMulterOptions({
        allowedExtensions: ['.pdf'],
        allowedSize: 10 * 1024 * 1024,
      }),
    ),
  )
  async insertPhoto(
    // @Body() data: CreatePhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let data: CreatePhotoDto;
    const fileUrl = await this.minio.uploadFileToBucket(file);
    data.user = 1;
    data.photo = fileUrl;
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
