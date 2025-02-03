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
    data.photo = fileUrl.fileName;
    data.url = fileUrl.url;
    return this.photosService.createPhoto(data);
  }

  @Get(':user_id')
  async getPhotoByUser(@Param('user_id') user_id: number) {
    return (await this.photosService.getPhotoByUser(user_id)).url;
  }

  @Delete(':user_id')
  async deletePhoto(@Param() user_id: number) {
    const file = await this.photosService.getPhotoByUser(user_id);
    await this.photosService.deletePhoto(file.photo_id);
    await this.minio.deleteDocument(file.photo);
  }
}
