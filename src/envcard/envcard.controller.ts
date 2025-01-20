import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { EnvcardService } from './envcard.service';
import { CreateEnvcardDto } from './dto/create-envcard.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/common/file-upload.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { randomFilename } from 'src/common/randomFilename';
import LogInRequest from 'src/user-auth/log-in-request.interface';

@Controller('envcard')
export class EnvcardController {
  constructor(private readonly envcardService: EnvcardService) {}

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
  })
  @ApiConsumes('multipart/form-data')
  async uploadEnvCardFile(
    @Body() data: CreateEnvcardDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: LogInRequest,
  ) {
    // FIXME: user after allocate authen guard
    // let data: CreateEnvcardDto;
    // data.user = req.user.user_id;
    data.file_card_name = randomFilename();
    return this.envcardService.createCardFile(data);
  }

  @Get(':user')
  async getEnvCard(@Param('user') user: number) {
    return this.envcardService.getCardFile(user);
  }

  @Delete(':user')
  async deleteEnvCard(@Param('user') user: number) {
    return this.envcardService.deleteCardFile(user);
  }
}
