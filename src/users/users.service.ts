import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, users } from '@prisma/client';
import { serviceErrorHandler } from 'src/common/services.error.handler';
import { CreateMainDto } from './dto/create-main.dto';
import { ExperiencesService } from 'src/experiences/experiences.service';
import * as bcrypt from 'bcryptjs';
import { CreateNewRequestDto } from 'src/requests/dto/create-new-request.dto';
import { RequestsService } from 'src/requests/requests.service';
import { CreateStatusDto } from 'src/requests/dto/create-status.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly expService: ExperiencesService,
    private readonly requestService: RequestsService,
  ) {}

  async getAllUsers(queryData: {
    page: number;
    status: string;
    adminLevel: number;
    adminInst: number;
    fname_th?: string;
    lname_th?: string;
    institution_name?: string;
  }) {
    try {
      let filtered: number[];
      if (queryData.status === 'ongoing') {
        filtered = [0, 1, 2, 3, 4, 5, 6, 7];
      } else if (queryData.status === 'activated') {
        filtered = [8, 9, 10, 11, 12, 13, 14, 15];
      } else if (queryData.status === 'suspended') {
        filtered = [16];
      } else {
        throw new BadRequestException('Invalid Status query');
      }

      const adminLevelFilter: Prisma.usersWhereInput = {
        // requests: { some: { request_status: { in: filtered } } },
        OR: [
          { fname_th: { startsWith: queryData.fname_th } },
          { lname_th: { contains: queryData.lname_th } },
          {
            institutions: {
              institution_name_th: { contains: queryData.institution_name },
            },
          },
        ],
        institutions: {},
      };

      if (queryData.adminLevel === 4) {
        adminLevelFilter.institution = queryData.adminInst;
      } else if (queryData.adminLevel === 3) {
        const selectedProvince =
          await this.prismaService.institutions.findUnique({
            where: { institution_id: queryData.adminInst },
            select: { province: true },
          });
        adminLevelFilter.institutions.province = selectedProvince.province;
      } else if (queryData.adminLevel === 5) {
        const selectedRegion = await this.prismaService.institutions.findUnique(
          {
            where: { institution_id: queryData.adminInst },
            select: { health_region: true },
          },
        );
        adminLevelFilter.institutions.health_region =
          selectedRegion.health_region;
      } else if (queryData.adminLevel === 2) {
        const selectedDep = await this.prismaService.institutions.findUnique({
          where: { institution_id: queryData.adminInst },
          select: { department: true },
        });

        adminLevelFilter.institutions.department = selectedDep.department;
      }

      console.log(adminLevelFilter);

      const limit = 10;
      const offset = (queryData.page - 1) * limit;

      const allUserList = [];
      const allUser = await this.prismaService.requests.findMany({
        select: { user: true },
        distinct: ['user'],
      });
      let users = [];

      allUser.forEach((item) => allUserList.push(item.user));

      for (let index = 0; index < allUserList.length; index++) {
        const user = await this.prismaService.users.findFirst({
          skip: offset,
          take: limit,
          select: {
            user_id: true,
            pname_th: true,
            pname_other_th: true,
            fname_th: true,
            lname_th: true,
            institutions: {
              select: {
                institution_name_th: true,
                sign_persons: { select: { sign_person_id: true } },
                departments: {
                  select: {
                    department_name_th: true,
                    ministries: { select: { ministry_name_th: true } },
                  },
                },
              },
            },
            members: {
              select: { start_date: true, end_date: true },
              orderBy: { end_date: 'desc' },
              take: 1,
            },
            requests: {
              select: { request_status: true },
              orderBy: { date_update: 'desc' },
              take: 1,
            },
            positions: { select: { position_name: true } },
            position_lvs: { select: { position_lv_name: true } },
          },
          // where: { user_id: allUserList[index] },
          where: { AND: [{ user_id: allUserList[index] }, adminLevelFilter] },
        });
        if (!user) {
          continue;
        }
        users.push(user);
      }

      try {
        users = users.filter((item) =>
          filtered.includes(item.requests[0].request_status),
        );
      } catch (error) {
        console.log(error);
        users = [];
      }

      const totalItems = await this.prismaService.users.count();
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data: users,
        pageData: {
          totalItems: totalItems,
          totalPages: totalPages,
          currentPage: queryData.page,
          limit: limit,
        },
      };
    } catch (error: any) {
      this.logger.error('ERROR: getAllUser');
      console.log(error);

      serviceErrorHandler(error);
    }
  }

  async getPrintUser(user_id: number) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { user_id: user_id },
        include: {
          epositions: true,
          positions: {
            select: {
              position_id: true,
              position_name: true,
              position_name_eng: true,
            },
          },
          institutions: {
            select: {
              institution_name_th: true,
              institution_name_eng: true,
              seals: { select: { seal_pix: true } },
              sign_persons: {
                select: {
                  sign_person_pname: true,
                  sign_person_name: true,
                  sign_person_lname: true,
                  signature_pix: true,
                  position: true,
                },
              },
              departments: {
                select: {
                  department_name_th: true,
                  department_name_eng: true,
                  ministries: {
                    select: {
                      ministry_name_th: true,
                      ministry_name_eng: true,
                    },
                  },
                },
              },
            },
          },
          position_lvs: {
            select: {
              position_lv_id: true,
              position_lv_name: true,
              position_lv_name_eng: true,
            },
          },
          photos: {
            select: {
              photo: true,
            },
          },
        },
        omit: {
          password: true,
          institution: true,
          position: true,
          position_lv: true,
        },
      });

      return user;
    } catch (error: any) {
      this.logger.error('ERROR: getPrintUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async getPrintExpbyUser(user_id: number) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { user_id: user_id },
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
          experiences: true,
        },
      });

      return user;
    } catch (error: any) {
      this.logger.error('ERROR: getPrintExpByUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { username: username },
      });

      return user;
    } catch (error: any) {
      this.logger.error('ERROR: getUserByUsername');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getUserById(id: number): Promise<users | null> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { user_id: id },
      });

      return user;
    } catch (error: any) {
      this.logger.error('ERROR: getUserByUsername');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async getUserByParams(username?: string, email?: string) {
    try {
      if (!username && !email) {
        throw new BadRequestException(
          'At least username or email must be provided',
        );
      }
      const user = await this.prismaService.users.findFirst({
        where: { OR: [{ email: email }, { username: username }] },
        include: {
          institutions: true,
          positions: true,
          position_lvs: true,
        },
      });

      if (!user) {
        throw new NotFoundException(
          'Not found user on provided username or email',
        );
      }

      return user;
    } catch (error: any) {
      this.logger.error('ERROR: getUserByParams');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
  async createUser(data: CreateMainDto) {
    try {
      const user = data.user;
      const exp = data.experiences;
      const { username, email } = user;
      const existedUser = await this.prismaService.users.findFirst({
        where: { OR: [{ username: username }, { email: email }] },
      });

      if (existedUser) {
        throw new BadRequestException('User already existed');
      }

      exp.map((item) => {
        item.exp_years = Number(
          this.expService.calculateExpYears(item.exp_ldate, item.exp_fdate),
        );
      });

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      // return { user, exp };
      return await this.prismaService.users.create({
        data: {
          experiences: { createMany: { data: exp } },
          requests: { create: { request_status: 0, request_type: 1 } },
          ...user,
        },
      });
    } catch (error: any) {
      this.logger.error('ERROR: createUser');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async updateUser(username: string, data: UpdateUserDto) {
    try {
      const existedUser = await this.prismaService.users.findUnique({
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
        filteredUpdatePayload = await this.prismaService.users.findUnique({
          where: { username: username },
        });
      }

      return await this.prismaService.users.update({
        where: { username: username },
        data: { ...filteredUpdatePayload },
      });
    } catch (error: any) {
      this.logger.error('ERROR: updateUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async deleteUser(user_id: number) {
    try {
      const existedUser = await this.prismaService.users.findUnique({
        where: { user_id: user_id },
      });

      if (!existedUser) {
        throw new NotFoundException(`User ${user_id} not found`);
      }

      return await this.prismaService.users.delete({
        where: { user_id: user_id },
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteUser');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }

  async validateUser(user_id: number) {
    try {
      const existedUser = await this.prismaService.users.findUnique({
        where: { user_id: user_id },
      });

      if (!existedUser) {
        throw new NotFoundException(`User ${user_id} not found`);
      }

      if (existedUser.is_validate === true) {
        throw new BadRequestException(`User ${user_id} already activated`);
      }

      return await this.prismaService.users.update({
        where: { user_id: user_id },
        data: { is_validate: true },
      });
    } catch (error: any) {
      this.logger.error('ERROR: validateUser');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async transactionValidateUser(user_id: number, approver: number) {
    try {
      return this.prismaService.$transaction(async (tx) => {
        const existedUser = await tx.users.findUnique({
          where: { user_id: user_id },
        });

        if (!existedUser) {
          throw new NotFoundException(`User ${user_id} not found`);
        }

        if (existedUser.is_validate === true) {
          throw new BadRequestException(`User ${user_id} already activated`);
        }

        await tx.users.update({
          where: { user_id: user_id },
          data: { is_validate: true },
        });

        const currentStatus = await tx.requests.findFirst({
          where: { user: user_id },
          orderBy: { date_update: 'desc' },
        });

        if (
          currentStatus.request_status !== 0 &&
          currentStatus.request_status === 1
        ) {
          throw new BadRequestException('User cannot re-activated');
        }

        const data: CreateStatusDto = {
          user: user_id,
          next_status: 1,
          request_type: 1,
          current_status: 0,
        };

        return await tx.requests.create({
          data: {
            user: data.user,
            request_status: data.next_status,
            request_type: data.request_type,
            approver: approver,
          },
          select: {
            user: true,
            req_id: true,
            request_status: true,
          },
        });
      });
      // return this.prismaService.$transaction(async () => {
      //   await this.validateUser(user_id);
      //   const data: CreateStatusDto = {
      //     current_status: 0,
      //     next_status: 1,
      //     request_type: 1,
      //     user: user_id,
      //   };

      //   await this.requestService.updateStatus(data, approver);
      // });
    } catch (error) {
      console.log(error);
      serviceErrorHandler(error);
    }
  }

  async invalidateUser(username: string) {
    try {
      const existedUser = await this.prismaService.users.findUnique({
        where: { username: username },
      });

      if (!existedUser) {
        throw new NotFoundException(`User ${username} not found`);
      }

      if (existedUser.is_validate === false) {
        throw new BadRequestException(`User ${username} not yet validated`);
      }

      return await this.prismaService.users.update({
        where: { username: username },
        data: { is_validate: false },
      });
    } catch (error: any) {
      this.logger.error('ERROR: invalidateUser');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async transactionDeleteUser(tx: Prisma.TransactionClient, user_id: number) {
    try {
      const existedUser = await tx.users.findUnique({
        where: { user_id: user_id },
      });

      if (!existedUser) {
        throw new NotFoundException(`User ${user_id} not found`);
      }

      await tx.users.delete({
        where: { user_id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUserAndRequest(user_id: number) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        await this.requestService.transactionDeleteRequest(tx, user_id);
        await this.transactionDeleteUser(tx, user_id);
      });
    } catch (error: any) {
      this.logger.error('ERROR: deleteUserAndRequest');
      this.logger.error(error);
      serviceErrorHandler(error);
    }
  }
}
