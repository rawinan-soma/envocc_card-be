import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { AdminCookieGuard } from 'src/admin-auth/admin-cookie.guard';
import { UserCookieGuard } from 'src/user-auth/user-cookie.guard';
import AdminRequest from 'src/admin-auth/admin-request.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getAllMembers() {
    return this.membersService.getAllMembers();
  }

  @UseGuards(AdminCookieGuard)
  @Get(':member_no')
  async getMember(@Param('member_no', ParseIntPipe) member_no: number) {
    return this.membersService.getMember(member_no);
  }

  @UseGuards(AdminCookieGuard)
  @Post()
  async createMember(@Body() newMember: CreateMemberDto) {
    return this.membersService.transactionCreateMember(newMember);
  }

  @UseGuards(AdminCookieGuard)
  @Patch('users/:user_id/deactivation')
  async deactivateMember(@Param() user_id: number) {
    return this.membersService.deactivateMember(user_id);
  }

  @UseGuards(UserCookieGuard)
  @Patch('qrpassword/:user_id')
  async setQRPassword(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body('password') password: string,
  ) {
    return this.membersService.setQrPassword(user_id, password);
  }

  @Get('qrcode/:qrcode_no')
  async getByQRCode(@Param() qrcode_no: string) {
    return this.membersService.getMemberByQrcode(qrcode_no);
  }

  @Post('qrcode/:qrcode_no/validate')
  async validateQrCode(
    @Body('password') password: string,
    @Param('qrcode_no') qrcode: string,
  ) {
    return this.membersService.validateQrCode(qrcode, password);
  }

  @UseGuards(AdminCookieGuard)
  @Patch('startDate/:user_id')
  async updateStartDate(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body('startDate') startDate: string,
    @Req() request: AdminRequest,
  ) {
    const admin = JSON.parse(JSON.stringify(request.user));
    const approver = admin.admin_id;
    return this.membersService.transactionUpdateStartDate(
      user_id,
      startDate,
      approver,
    );
  }
}
