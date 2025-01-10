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
    return this.membersService.createMember(newMember);
  }

  @Patch('deactivation/:member_no')
  async deactivateMember(
    @Param('member_no') member_no: number,
    @Body() deactivatedMember: UpdateMemberDto,
  ) {
    return this.membersService.deactivateMember(member_no, deactivatedMember);
  }

  @Patch('qrpassword/:user_id')
  async setQRPassword(
    @Param('user_id') user_id: number,
    @Body('password') password: string,
  ) {
    return this.membersService.setQrPassword(user_id, password);
  }
}
