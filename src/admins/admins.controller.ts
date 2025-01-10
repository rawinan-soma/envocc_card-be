import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // @UseGuards(CookieAuthGuard)
  @Get()
  async getAdmin() {
    return this.adminsService.getAllAdmins();
  }

  @Get('query')
  async getAdminByParams(
    @Query('username') username: string,
    @Query('email') email: string,
  ) {
    return this.adminsService.getAdminByParams(username, email);
  }

  @Post()
  async createAdmin(@Body() newAdmin: CreateAdminDto) {
    return this.adminsService.createAdmin(newAdmin);
  }

  @Patch(':username')
  async UpdateUserDto(
    @Param('username') username: string,
    @Body() updatedAdmin: UpdateAdminDto,
  ) {
    return this.adminsService.updateAdmin(username, updatedAdmin);
  }

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.adminsService.deleteAdmin(username);
  }
}
