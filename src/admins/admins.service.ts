import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { serviceErrorHandler } from 'src/common/services.error.handler';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminsService {
  private readonly logger = new Logger(AdminsService.name);

  constructor(private readonly prismaService: PrismaService) {}

  // #TODO: Pagination in production
  async getAllAdmins() {
    try {
      const admins = await this.prismaService.admins.findMany({
        include: {
          institutions: { include: { departments: true } },
          positions: { select: { position_name: true } },
          position_lvs: { select: { position_lv_name: true } },
        },
      });

      return admins;
    } catch (error: any) {
      this.logger.error('ERROR: getAllUser');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getAdminByParams(username?: string, email?: string) {
    try {
      if (!username && !email) {
        throw new BadRequestException(
          'At least username or email must be provided',
        );
      }
      const admin = await this.prismaService.admins.findFirst({
        where: { OR: [{ email: email }, { username: username }] },
      });

      if (!admin) {
        throw new NotFoundException(
          'Not found user on provided username or email',
        );
      }

      return admin;
    } catch (error: any) {
      this.logger.error('ERROR: getUserByParams');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async createAdmin(data: CreateAdminDto) {
    try {
      const { username, email } = data;
      const existedUser = await this.prismaService.admins.findFirst({
        where: { OR: [{ username: username }, { email: email }] },
      });

      if (existedUser) {
        throw new BadRequestException('User already existed');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      console.log(data);

      return await this.prismaService.admins.create({
        data: {
          email: data.email,
          fname: data.fname,
          lname: data.lname,
          password: data.password,
          pname: data.pname,
          private_number: data.private_number,
          username: data.username,
          work_number: data.work_number,
          institution: data.institution,
          level: data.admin_level,
          position: data.position,
          position_lv: data.position_lv,
        },
      });
    } catch (error: any) {
      this.logger.error('ERROR: createUser');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async updateAdmin(username: string, data: UpdateAdminDto) {
    try {
      const existedUser = await this.prismaService.admins.findUnique({
        where: { username: username },
      });

      if (!existedUser) {
        throw new NotFoundException(`User ${username} not found`);
      }

      let filteredUpdatePayload = Object.fromEntries(
        Object.entries(data).filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => value !== null && value !== '',
        ),
      );

      if (Object.keys(filteredUpdatePayload).length === 0) {
        filteredUpdatePayload = await this.prismaService.admins.findUnique({
          where: { username: username },
        });
      }

      return await this.prismaService.admins.update({
        where: { username: username },
        data: { ...filteredUpdatePayload },
      });
    } catch (error: any) {
      this.logger.error('ERROR: updateUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async deleteAdmin(username: string) {
    try {
      const existedUser = await this.prismaService.admins.findUnique({
        where: { username: username },
      });

      if (!existedUser) {
        throw new NotFoundException(`User ${username} not found`);
      }

      return await this.prismaService.admins.delete({
        where: { username: username },
      });
    } catch (error: any) {
      this.logger.error('ERROR: updateUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async getAdminByUsername(username: string) {
    try {
      const admin = await this.prismaService.admins.findUnique({
        where: { username: username },
      });

      return admin;
    } catch (error: any) {
      this.logger.error('ERROR: getAdminByUsername');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getAdminById(id: number) {
    try {
      const admin = await this.prismaService.admins.findUnique({
        where: { admin_id: id },
        omit: { password: true },
      });

      return admin;
    } catch (error: any) {
      this.logger.error('ERROR: getUserByUsername');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  // TODO: Query admins by instituion
  // รับ Inst จาก QueryParameters Filter by Institution
  // คืนค่า Admin ตามระดับ
}
