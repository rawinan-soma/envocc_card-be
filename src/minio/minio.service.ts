import { randomFilename } from 'src/common/randomFilename';
import { Inject, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import { extname } from 'path';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class MinioService {
  private readonly client: Minio.Client;
  private readonly bucketName: string;

  constructor(@Inject('MINIO_BUCKET_NAME') bucketName: string) {
    this.bucketName = bucketName;

    this.client = new Minio.Client({
      endPoint: 'localhost',
      // endPoint: 'minio',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });

    this.createBucket();
  }

  async createBucket() {
    const existBucket = await this.client.bucketExists(this.bucketName);

    if (!existBucket) {
      await this.client.makeBucket(this.bucketName);
      console.log(`${this.bucketName} created!!`);
    }

    this.setPublic();
  }

  async uploadFileToBucket(file: Express.Multer.File) {
    try {
      // const fileStream = fs.createReadStream(file.path);
      const suffix: string = Date.now() + '-' + randomFilename();
      const fileName = `${suffix}${extname(file.originalname)}`;

      await this.client.putObject(
        this.bucketName,
        fileName,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype },
      );
      return {
        url: `localhost:9000/${this.bucketName}/${fileName}`,
        fileName: fileName,
      };
      // return fileName;
    } catch (error) {
      serviceErrorHandler(error);
    }
  }

  async getFileFromBucket(filename: string) {
    return await this.client.getObject(this.bucketName, filename);
  }

  async getPresignedUrl(filename: string, expire_second = 300) {
    try {
      return await this.client.presignedGetObject(
        this.bucketName,
        filename,
        expire_second,
      );
    } catch (error) {
      serviceErrorHandler(error);
    }
  }

  async deleteDocument(fileName: string) {
    try {
      return await this.client.removeObject(this.bucketName, fileName);
    } catch (error) {
      serviceErrorHandler(error);
    }
  }

  async setPublic() {
    try {
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.bucketName}/*`],
          },
        ],
      };
      await this.client.setBucketPolicy(
        this.bucketName,
        JSON.stringify(policy),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
