import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class AdminAuthService {
  constructor(private readonly admins: AdminsService) {}

  public async getAuthenticatedAdmin(username: string, password: string) {
    try {
      const admin = await this.admins.getAdminByUsername(username);

      await this.verifyPassword(password, admin.password);

      return admin;
    } catch (error) {
      serviceErrorHandler(error);
    }
  }

  private async verifyPassword(inputPassword: string, storePassword: string) {
    const isPasswordMatching = inputPassword === storePassword;

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong credential');
    }
  }

  // TODO: enforce session to be 1 session at a time
}
