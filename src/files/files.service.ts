import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

import { RequestFileServices } from 'src/request-file/request-file.service';
import { GovcardService } from 'src/govcard/govcard.service';
import { ExpfileService } from 'src/expfile/expfile.service';

import { PrismaService } from 'src/prisma/prisma.service';

interface MulterOptionsParams {
  allowedExtensions: string[];
  allowedSize: number;
}

@Injectable()
export class FilesService {
  getMulterOptions({ allowedExtensions, allowedSize }: MulterOptionsParams) {
    return {
      fileFilter: (req, file, cb) => {
        const fileExt = extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(fileExt)) {
          return cb(
            new BadRequestException(`Unsupport file type: ${fileExt}`),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: allowedSize,
      },
    };
  }
}

@Injectable()
export class UploadService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly requestFile: RequestFileServices,
    private readonly expFile: ExpfileService,
    private readonly govCardFile: GovcardService,
  ) {}

  async transactionUploadAndUpdateRequest(
    reqFile: Express.Multer.File,
    gov: Express.Multer.File,
    exp: Express.Multer.File,
    user: number,
  ) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await this.requestFile.transactionCreateReqFile(tx, reqFile, user);
        await this.expFile.transactionCreateExpFile(tx, exp, user);
        await this.govCardFile.transactionCreateGovCard(tx, gov, user);
        await tx.requests.create({
          data: {
            user: user,
            request_type: 1,
            request_status: 4,
            description: 'Auto create',
          },
        });

        // const current = await tx.requests.findFirst({
        //   where: { user: user },
        //   orderBy: { request_status: 'desc' },
        // });
        // console.log('Current status: ', current.request_status);

        // if (current.request_status === 3) {
        //   tx.requests.create({
        //     data: {
        //       user: user,
        //       request_type: 1,
        //       request_status: 4,
        //       description: 'Auto create',
        //     },
        //   });
        // }
        // else {
        //   throw new BadRequestException(
        //     'Cannot progress to next status - see logs',
        //   );
        // }
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error Uploading Files - See logs');
    }
  }
}
