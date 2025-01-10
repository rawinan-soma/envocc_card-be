import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async getAllMembers() {
    try {
      const members = await this.prismaService.members.findMany();

      return members;
    } catch (error: any) {
      this.logger.error('ERROR: getAllMembers');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getMember(user_id: number) {
    try {
      const member = await this.prismaService.members.findFirst({
        where: { user: user_id, is_active: true },
        orderBy: { end_date: 'desc' },
        include: {
          users: {
            select: {
              username: true,
              pname_th: true,
              pname_other_th: true,
              fname_th: true,
              lname_th: true,
              pname_en: true,
              pname_other_en: true,
              fname_en: true,
              lname_en: true,
              blood: true,
              position: true,
              position_lv: true,
              photos: {
                select: {
                  photo: true,
                },
              },
              epositions: {
                select: {
                  eposition_id: true,
                  eposition_name_th: true,
                },
              },
              institutions: {
                select: {
                  departments: {
                    select: {
                      department_id: true,
                      department_name_th: true,
                      department_name_eng: true,
                      sign_persons: {
                        select: {
                          signature_pix: true,
                          sing_person_pname: true,
                          sign_person_name: true,
                          sign_person_lname: true,
                          position: true,
                        },
                      },
                      seals: {
                        select: {
                          seal_id: true,
                          seal_pix: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!member) {
        throw new NotFoundException('Not found member provide by this id');
      }

      return member;
    } catch (error: any) {
      this.logger.error('ERROR: getMember');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createMember(data: CreateMemberDto) {
    try {
      const endDate = new Date(data.start_date);
      endDate.setFullYear(endDate.getFullYear() + 5);
      endDate.setDate(endDate.getDate() - 1);

      const initPassword = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      return await this.prismaService.members.create({
        data: { end_date: endDate, qrcode_pass: initPassword, ...data },
      });
    } catch (error: any) {
      this.logger.error('ERROR: createMember');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async deactivateMember(member_no: number, data: UpdateMemberDto) {
    try {
      const selectedMember = await this.getMember(member_no);
      const isInactive = selectedMember.is_active === false;

      if (!isInactive) {
        return this.prismaService.members.update({
          where: { member_id: selectedMember.member_id },
          data: {
            is_active: false,
            ...data,
          },
        });
      } else {
        throw new BadRequestException('Member already inactivated');
      }
    } catch (error: any) {
      this.logger.error('ERROR: deactivateMember');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async setQrPassword(user_id: number, password: string) {
    try {
      const selectedMember = await this.getMember(user_id);
      const hasPassword = selectedMember.qrcode_pass !== '';
      if (hasPassword) {
        throw new BadRequestException('This card already has password');
      } else {
        return this.prismaService.members.update({
          where: { user: user_id, end_date: selectedMember.end_date },
          data: { qrcode_pass: password },
          omit: {
            qrcode_pass: true,
          },
        });
      }
    } catch (error: any) {
      this.logger.error('ERROR: SetQRPassword');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
