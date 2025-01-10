import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAuthService {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UserAuthService.name);
  private async verifyPassword(inputPassword: string, password: string) {
    // FIXME: This line use only in DEVELOP stage
    // !! DO NOT USE THIS IN PRODUCTION บาปมาก
    const isPasswordMatch = inputPassword === password;

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong Credential provided');
    }
  }

  async getAuthenticatedUser(username: string, password: string) {
    try {
      const user = await this.usersService.getUserByUsername(username);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.is_validate === false) {
        throw new BadRequestException('User invalid');
      }

      await this.verifyPassword(password, user.password);

      return user;
    } catch (error: any) {
      this.logger.error('ERROR: getAuthenticateUser');
      throw error;
    }
  }
}
