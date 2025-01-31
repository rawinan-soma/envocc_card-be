import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomFilename } from 'src/common/randomFilename';

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
