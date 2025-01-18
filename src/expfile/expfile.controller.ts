import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseInterceptors,
  Get,
  UploadedFile,
  Param,
  Delete,
  Req,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpfileService } from './expfile.service';
import { CreateExpfileDto } from './dto/create-expfile.dto';

import { FileUploadDto } from 'src/common/file-upload.dto';
import { diskStorage } from 'multer';
import { randomFilename } from 'src/common/randomFilename';
import LogInRequest from 'src/user-auth/log-in-request.interface';

@Controller('expFiles')
export class ExpfileController {
  constructor(private readonly expfileService: ExpfileService) {}

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
  async uploadEnvCardFile(
    @Body() data: CreateExpfileDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: LogInRequest,
  ) {
    // FIXME: use after allocate authen guard in full test and prod stage
    // let data: CreateExpfileDto;
    // data.user = req.user.user_id;
    data.file_name = randomFilename();
    return this.expfileService.createExpFile(data);
  }

  @Get(':user')
  async getEnvCard(@Param('user') user: number) {
    return this.expfileService.getExpFile(user);
  }

  @Delete(':user')
  async deleteEnvCard(@Param('user') user: number) {
    return this.expfileService.deleteExpFile(user);
  }
}
