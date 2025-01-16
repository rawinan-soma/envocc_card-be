import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { CreateGovcardDto } from './dto/create-govcard.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import LogInRequest from 'src/user-auth/log-in-request.interface';
import { randomFilename } from 'src/common/randomFilename';

@Controller('govCards')
export class GovcardController {
  constructor(private readonly govcardService: GovcardService) {}

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
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadGovCardFile(
    @Body() data: CreateGovcardDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: LogInRequest,
  ) {
    // FIXME: use after authen guard
    // let data: CreateGovcardDto;
    // data.user = req.user.user_id;
    data.file_name = randomFilename();

    return this.govcardService.createGovCard(data);
  }
}
