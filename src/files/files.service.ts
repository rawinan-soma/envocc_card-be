import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomFilename } from 'src/common/randomFilename';

interface MulterOptionsParams {
  destination: string;
  allowedExtensions: string[];
  allowedSize: number;
}

@Injectable()
export class FilesService {
  getMulterOptions({
    destination,
    allowedExtensions,
    allowedSize,
  }: MulterOptionsParams) {
    return {
      storage: diskStorage({
        destination: destination,
        filename: (req, file, cb) => {
          const suffix: string = Date.now() + '-' + randomFilename();
          cb(null, `${file.fieldname}-${suffix}${extname(file.originalname)}`);
        },
      }),

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
