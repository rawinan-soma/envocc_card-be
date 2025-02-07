import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
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
          sign_persons: {
            select: {
              signature_pix: true,
              sign_person_pname: true,
              sign_person_name: true,
              sign_person_lname: true,
              position: true,
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
      // TODO: Search member_no and add in create
      // const endDate = new Date(data.start_date);
      // endDate.setFullYear(endDate.getFullYear() + 5);
      // endDate.setDate(endDate.getDate() - 1);

      const initPassword = Math.floor(
        10000000 + Math.random() * 90000000,
      ).toString();

      const initQRCode = Math.floor(
        10000000 + Math.random() * 90000000,
      ).toString();

      return await this.prismaService.members.create({
        data: {
          qrcode: initQRCode,
          qrcode_pass: initPassword,
          ...data,
        },
      });
    } catch (error: any) {
      this.logger.error('ERROR: createMember');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async deactivateMember(user_id: number) {
    try {
      const selectedMember = await this.prismaService.members.findFirst({
        where: { user: user_id },
        orderBy: { start_date: 'desc' },
        select: { member_id: true, is_active: true },
      });
      const isInactive = selectedMember.is_active === false;

      if (!isInactive) {
        return this.prismaService.members.update({
          where: { member_id: selectedMember.member_id },
          data: {
            is_active: false,
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
      const selectedMember = await this.prismaService.members.findFirst({
        where: { user: user_id },
        orderBy: { start_date: 'desc' },
        select: { member_id: true, is_active: true, qrcode_pass: true },
      });
      const hasPassword = selectedMember.qrcode_pass !== '';
      if (hasPassword) {
        throw new BadRequestException('This card already has password');
      } else {
        return this.prismaService.members.update({
          where: { member_id: selectedMember.member_id },
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

  async getMemberByQrcode(qrcode_no: string) {
    return this.prismaService.members.findFirst({
      where: { qrcode: qrcode_no },
      select: { user: true },
    });
  }

  async updateStartDate(user_id: number, start_date: string) {
    const targetMember = await this.prismaService.members.findFirst({
      where: { user: user_id },
      orderBy: { create_date: 'desc' },
      select: { member_id: true },
    });

    const startDate = new Date(start_date);
    let endDate: Date;
    endDate.setFullYear(startDate.getFullYear() + 5);
    endDate.setDate(endDate.getDate() - 1);

    return this.prismaService.members.update({
      where: { member_id: targetMember.member_id },
      data: { start_date: startDate, end_date: endDate },
    });
  }

  async transactionCreateMember(data: CreateMemberDto) {
    try {
      return this.prismaService.$transaction(async (tx) => {
        const initPassword = Math.floor(
          10000000 + Math.random() * 90000000,
        ).toString();

        const initQRCode = Math.floor(
          10000000 + Math.random() * 90000000,
        ).toString();

        const existedMember = await tx.members.findFirst({
          where: { user: data.user },
        });

        const latestMember = await tx.members.findFirst({
          orderBy: { member_no: 'desc' },
        });

        let nextMemberNo: number;
        if (!latestMember) {
          nextMemberNo = 1;
        } else if (existedMember) {
          nextMemberNo = existedMember.member_no;
        } else {
          nextMemberNo = latestMember.member_no + 1;
        }

        return await tx.members.create({
          data: {
            member_no: nextMemberNo,
            qrcode: initQRCode,
            qrcode_pass: initPassword,
            ...data,
          },
          select: { member_id: true },
        });
      });
    } catch (error) {
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
