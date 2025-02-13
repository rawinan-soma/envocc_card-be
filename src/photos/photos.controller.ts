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
  ParseIntPipe,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { MinioService } from 'src/minio/minio.service';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';

@UseGuards(AdminCookieGuard)
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
    @Body('user', ParseIntPipe) user: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileUrl = await this.minio.uploadFileToBucket(file);
    const data: CreatePhotoDto = new CreatePhotoDto();
    data.user = user;
    data.photo = fileUrl.fileName;
    data.url = fileUrl.url;
    return this.photosService.createPhoto(data);
  }

  @Get(':user_id')
  async getPhotoByUser(@Param('user_id', ParseIntPipe) user_id: number) {
    return (await this.photosService.getPhotoByUser(user_id)).url;
  }

  @Delete(':user_id')
  async deletePhoto(@Param('user_id', ParseIntPipe) user_id: number) {
    const file = await this.photosService.getPhotoByUser(user_id);
    await this.photosService.deletePhoto(file.photo_id);
    await this.minio.deleteDocument(file.photo);

    return { msg: 'deleted' };
  }
}
