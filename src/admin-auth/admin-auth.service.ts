import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { AdminsService } from '../admins/admins.service';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(private readonly adminsService: AdminsService) {}
  private readonly logger = new Logger(AdminAuthService.name);
  private async verifyPassword(inputPassword: string, password: string) {
    // FIXME: This line use only in DEVELOP stage
    // !! DO NOT USE THIS IN PRODUCTION บาปมาก
    const isPasswordMatch = inputPassword === password;

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong Credential provided');
    }
  }

  async getAuthenticatedAdmin(username: string, password: string) {
    try {
      const admin = await this.adminsService.getAdminByUsername(username);

      if (!admin) {
        throw new BadRequestException('User not found');
      }

      await this.verifyPassword(password, admin.password);

      return admin;
    } catch (error: any) {
      this.logger.error('ERROR: getAuthenticatedAdmin');
      this.logger.error(error);
    }
  }
}
