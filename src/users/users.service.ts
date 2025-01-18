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

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly expService: ExperiencesService,
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
        requests: { some: { request_status: { in: filtered } } },
        OR: [
          { fname_th: { startsWith: queryData.fname_th } },
          { lname_th: { contains: queryData.lname_th } },
          {
            institutions: {
              institution_name_th: { contains: queryData.institution_name },
            },
          },
        ],
      };

      if (queryData.adminLevel === 4) {
        adminLevelFilter.institution = queryData.adminInst;
      } else if (queryData.adminLevel === 3) {
        adminLevelFilter.institutions.province = (
          await this.prismaService.institutions.findUnique({
            where: { institution_id: queryData.adminInst },
            select: { province: true },
          })
        ).province;
      } else if (queryData.adminLevel === 5) {
        adminLevelFilter.institutions.health_region = (
          await this.prismaService.institutions.findUnique({
            where: { institution_id: queryData.adminInst },
            select: { health_region: true },
          })
        ).health_region;
      } else if (queryData.adminLevel === 2) {
        adminLevelFilter.institutions.department = (
          await this.prismaService.institutions.findUnique({
            where: { institution_id: queryData.adminInst },
            select: { department: true },
          })
        ).department;
      }

      const limit = 10;
      const offset = (queryData.page - 1) * limit;

      const users = await this.prismaService.users.findMany({
        skip: offset,
        take: limit,
        orderBy: { members: { end_date: 'desc' } },
        select: {
          user_id: true,
          pname_th: true,
          pname_other_th: true,
          fname_th: true,
          lname_th: true,
          institutions: {
            select: {
              institution_name_th: true,
              departments: {
                select: {
                  department_name_th: true,
                  ministries: { select: { ministry_name_th: true } },
                },
              },
            },
          },
          members: { select: { start_date: true, end_date: true } },
          requests: { select: { request_status: true } },
        },
        where: adminLevelFilter,
        // where: {
        //   institutions: {},
        //   requests: { some: { request_status: { in: filtered } } },
        //   OR: [
        //     { fname_th: { startsWith: queryData.fname_th } },
        //     { lname_th: `%${queryData.lname_th}%` },
        //     {
        //       institutions: {
        //         institution_name_th: `%${queryData.institution_name}%`,
        //       },
        //     },
        //   ],
        // },
      });
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
      this.logger.error(error);

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
                  sign_persons: true,
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
          experience: true,
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

      exp.map((item) => {
        item.exp_years = Number(
          this.expService.calculateExpYears(item.exp_ldate, item.exp_fdate),
        );
      });

      if (existedUser) {
        throw new BadRequestException('User already existed');
      }

      // return { user, exp };
      return await this.prismaService.users.create({
        data: { ...user, experience: { createMany: { data: exp } } },
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
      this.logger.error('ERROR: updateUser');
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
}
