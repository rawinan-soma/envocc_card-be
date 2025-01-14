import {
  Controller,
  Get,
  Param,
  Req,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import LogInRequest from 'src/admin-auth/log-in-request.interface';
import { createStatusDto } from './dto/create-status.dto';
import { CreateNewRequestDto } from './dto/create-new-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('all')
  async getAllStatuses() {
    return this.requestsService.getAllLatestStatuses();
  }

  @Get('users/:id')
  async getCurrentStatus(@Param('id') id: number) {
    return this.requestsService.getCurrentStatus(id);
  }

  @Post('update')
  async updateStatus(
    @Req() req: LogInRequest,
    @Body() updatedStatus: createStatusDto,
  ) {
    const approver = req.user.admin_id;

    return this.requestsService.updateStatus(updatedStatus, approver);
  }

  @Post('newcard')
  async createNewRequest(@Body() newRequest: CreateNewRequestDto) {
    return this.requestsService.createNewRequest(newRequest);
  }

  @Delete('users/:user_id')
  async deleteRequestByUser(@Param('user_id') user_id: number) {}
}
