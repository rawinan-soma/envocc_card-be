import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import * as fs from 'fs';

@Injectable()
export class PhotosService {
  private readonly logger = new Logger(PhotosService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getPhotoByUser(user_id: number) {
    try {
      const photo = await this.prismaService.photos.findFirst({
        where: { user: user_id },
        orderBy: { create_date: 'desc' },
      });

      if (!photo) {
        throw new NotFoundException('Cannot find photo for this user_id');
      }

      return photo;
    } catch (error: any) {
      this.logger.error('ERROR: getPhotoByUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createPhoto(data: CreatePhotoDto) {
    try {
      return await this.prismaService.photos.create({
        data: data,
      });
    } catch (error: any) {
      this.logger.error('ERROR: createPhoto');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async deletePhoto(photo_id: number) {
    try {
      const existedPhoto = await this.prismaService.photos.findUnique({
        where: { photo_id: photo_id },
      });

      if (!existedPhoto) {
        throw new NotFoundException('This phot did not existed');
      }

      return await this.prismaService.photos.delete({
        where: { photo_id: photo_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteDocument');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
