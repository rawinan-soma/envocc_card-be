import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import AdminRequest from 'src/admin-auth/admin-request.interface';
// import LogInRequest from 'src/admin-auth/log-in-request.interface';
// import { CookieAuthGuard } from 'src/common/cookie-auth.guard';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  // @Get(':user_id')
  // async getOneExps(@Param('user_id') user_id: number) {
  //   return await this.experiencesService.getOneUserExps(user_id);
  // }

  // @Post()
  // async addExps(@Body('data') data: CreateExperienceDto) {
  //   return await this.experiencesService.addExps(data);
  // }

  @Patch(':exp_id')
  async updateExps(
    @Param('exp_id', ParseIntPipe) exp_id: number,
    @Body('data') data: UpdateExperienceDto,
  ) {
    return await this.experiencesService.editExps(exp_id, data);
  }

  @Delete(':exp_id')
  async deleteExps(@Param('exp_id', ParseIntPipe) exp_id: number) {
    return await this.experiencesService.deleteExps(exp_id);
  }

  @Get('expsForm')
  async getExpsForm(@Req() request: AdminRequest) {
    const institution_id = request.admin.institution;

    return await this.experiencesService.getAllExpByInstitution(institution_id);
  }
}
