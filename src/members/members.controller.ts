import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async getAllMembers() {
    return this.membersService.getAllMembers();
  }

  @Get(':member_no')
  async getMember(@Param('member_no') member_no: number) {
    return this.membersService.getMember(member_no);
  }

  @Post()
  async createMember(@Body() newMember: CreateMemberDto) {
    return this.membersService.transactionCreateMember(newMember);
  }

  @Patch('users/:user_id/deactivation')
  async deactivateMember(@Param() user_id: number) {
    return this.membersService.deactivateMember(user_id);
  }

  @Patch('qrpassword/:user_id')
  async setQRPassword(
    @Param('user_id') user_id: number,
    @Body('password') password: string,
  ) {
    return this.membersService.setQrPassword(user_id, password);
  }

  @Get('qrcode/:qrcode_no')
  async getByQRCode(@Param() qrcode_no: string) {
    return this.membersService.getMemberByQrcode(qrcode_no);
  }
}
