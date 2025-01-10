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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import LogInRequest from 'src/admin-auth/log-in-request.interface';
import { CreateMainDto } from './dto/create-main.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Req() req: LogInRequest,
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
    // const pageNumber = parseInt(page, 10) || 1;

    const adminLevel = req.user.level;
    const adminInst = req.user.institution;

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

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser(username);
  }
}
