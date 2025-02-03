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
// import { CookieAuthGuard } from 'src/common/cookie-auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // admin
  @Get()
  async getAdmin() {
    return this.adminsService.getAllAdmins();
  }

  // admin
  @Get('query')
  async getAdminByParams(
    @Query('username') username: string,
    @Query('email') email: string,
  ) {
    return this.adminsService.getAdminByParams(username, email);
  }

  // admin
  @Post()
  async createAdmin(@Body() newAdmin: CreateAdminDto) {
    return this.adminsService.createAdmin(newAdmin);
  }

  // admin
  @Patch(':username')
  async UpdateUserDto(
    @Param('username') username: string,
    @Body() updatedAdmin: UpdateAdminDto,
  ) {
    return this.adminsService.updateAdmin(username, updatedAdmin);
  }

  // admin
  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.adminsService.deleteAdmin(username);
  }
}
