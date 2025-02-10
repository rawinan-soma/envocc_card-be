import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import LogInRequest from 'src/admin-auth/log-in-request.interface';
import { CreateMainDto } from './dto/create-main.dto';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import AdminRequest from 'src/admin-auth/admin-request.interface';
import { UserCookieGuard } from 'src/user-auth/user-cookie.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Req() request: AdminRequest,
    // @Query('adminLevel') adminLevel: number,
    // @Query('adminInst') adminInst: number,
    @Query('page') page: string,
    @Query('status') status: string,
    @Query('fname_th') fname_th?: string,
    @Query('lname_th') lname_th?: string,
    @Query('institution_name') institution_name?: string,
  ) {
    const pageNumber =
      page == '0' || !page || page.match(/[a-zA-Z]/) ? 1 : parseInt(page, 10);

    const adminLevel = request.admin.level;
    const adminInst = request.admin.institution;

    return this.usersService.getAllUsers({
      adminLevel: adminLevel,
      page: pageNumber,
      status: status,
      fname_th: fname_th,
      institution_name: institution_name,
      lname_th: lname_th,
      adminInst: adminInst,
    });
  }

  @Get('printForm/:user_id')
  async getPrintUser(@Param('user_id') user_id: number) {
    return this.usersService.getPrintUser(user_id);
  }

  @Get('printExp/:user_id')
  async getPrintExp(@Param('user_id') user_id: number) {
    return this.usersService.getPrintExpbyUser(user_id);
  }

  // @Get('query')
  // async getUserByParams(
  //   @Query('username') username: string,
  //   @Query('email') email: string,
  // ) {
  //   return this.usersService.getUserByParams(username, email);
  // }

  // {
  //   user: {userId...},
  //   exp: [{},{}]
  // }

  @Post()
  async createUser(@Body() newUserWithExp: CreateMainDto) {
    return this.usersService.createUser(newUserWithExp);
  }

  @Patch(':username')
  async UpdateUserDto(
    @Param('username') username: string,
    @Body() updatedUser: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, updatedUser);
  }

  // @Delete(':user_id')
  // async deleteUser(@Param('user_id') user_id: number) {
  //   return this.usersService.deleteUser(user_id);
  // }

  // @Patch('validate/:user_id')
  // async validateUser(@Param('user_id') user_id: number) {
  //   return this.usersService.validateUser(user_id);
  // }

  @Patch('validate/:user_id')
  async transactionValidateUser(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Req() request: AdminRequest,
  ) {
    const approver = request.admin.admin_id;
    return this.usersService.transactionValidateUser(user_id, approver);
  }

  @Delete(':user_id')
  async deleteUserRequest(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.usersService.deleteUserAndRequest(user_id);
  }
}
