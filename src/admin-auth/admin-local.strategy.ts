import { AdminAuthService } from './admin-auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { admins } from '@prisma/client';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  private readonly logger = new Logger(AdminLocalStrategy.name);
  constructor(private readonly adminAuthService: AdminAuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<admins> {
    try {
      const admin = await this.adminAuthService.getAuthenticatedAdmin(
        username,
        password,
      );

      if (!admin) {
        throw new UnauthorizedException();
      }

      return admin; // Ensure a full admin object is returned here
    } catch (error) {
      this.logger.error('Error during admin validation', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
