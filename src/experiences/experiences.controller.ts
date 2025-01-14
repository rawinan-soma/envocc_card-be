import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import LogInRequest from 'src/admin-auth/log-in-request.interface';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}
  @Get(':user_id')
  async getOneExps(@Param('user_id') user_id: number) {
    return await this.experiencesService.getOneUserExps(user_id);
  }

  @Post()
  async addExps(@Body('data') data: CreateExperienceDto) {
    return await this.experiencesService.addExps(data);
  }

  @Patch(':exp_id')
  async updateExps(
    @Param('exp_id') exp_id: number,
    @Body('data') data: UpdateExperienceDto,
  ) {
    return await this.experiencesService.editExps(exp_id, data);
  }

  @Delete(':exp_id')
  async deleteExps(@Param('exp_id') exp_id: number) {
    return await this.experiencesService.deleteExps(exp_id);
  }

  @Get('expsForm')
  async getExpsForm(@Req() req: LogInRequest) {
    const institution_id = req.user.institution;

    return await this.experiencesService.getAllExpByInstitution(institution_id);
  }
}
