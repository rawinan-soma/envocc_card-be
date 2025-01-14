import { Injectable, Logger } from '@nestjs/common';
import { CreateSignPersonDto } from './dto/create-sign-person.dto';
import { UpdateSignPersonDto } from './dto/update-sign-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class SignPersonService {
  private readonly logger = new Logger(SignPersonService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAllSignPersons() {
    try {
      const signPersons = await this.prisma.sign_persons.findMany({
        select: {
          department: true,
          sing_person_pname: true,
          sign_person_name: true,
          sign_person_lname: true,
          position: true,
          signature_pix: true,
          sing_person_active: true,
        },
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
    } catch (error: any) {}
  }
}
