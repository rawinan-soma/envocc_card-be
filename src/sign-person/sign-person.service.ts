import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSignPersonDto } from './dto/create-sign-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class SignPersonService {
  private readonly logger = new Logger(SignPersonService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAllSignPersons() {
    try {
      const signPersons = await this.prisma.sign_persons.findMany({
        omit: { sign_person_id: true },
      });

      return signPersons;
    } catch (error: any) {
      this.logger.error('ERROR: getAllSignPersons');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }

  async addSignPerson(data: CreateSignPersonDto) {
    try {
      const signPerson = await this.prisma.sign_persons.findFirst({
        where: {
          sign_person_name: data.sign_person_name,
          sign_person_lname: data.sign_person_lname,
        },
      });

      if (signPerson) {
        throw new BadRequestException('This Sign person already exist');
      }

      return await this.prisma.sign_persons.create({
        data: {
          sign_person_pname: data.sign_person_pname,
          sign_person_active: true,
          sign_person_lname: data.sign_person_lname,
          sign_person_name: data.sign_person_name,
          signature_pix: data.signature_pix,
          position: data.position,
          admins: { connect: { admin_id: data.update_admin } },
          departments: { connect: { department_id: data.department } },
        },
      });
    } catch (error: any) {
      this.logger.error('ERROR: addSignPerson');
      this.logger.error(error);

      serviceErrorHandler(error);
    }
  }
}
