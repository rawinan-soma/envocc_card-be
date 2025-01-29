import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { serviceErrorHandler } from 'src/common/services.error.handler';

@Injectable()
export class UserAuthService {
  constructor(private readonly users: UsersService) {}
  public async getAuthenticatedUser(username: string, password: string) {
    try {
      const user = await this.users.getUserByUsername(username);
      await this.verifyPassword(password, user.password);

      return user;
    } catch (error) {
      serviceErrorHandler(error);
    }
  }

  private async verifyPassword(inputPassword: string, storePassword: string) {
    const isPasswordMatching = inputPassword === storePassword;

    if (!isPasswordMatching) {
      throw new UnauthorizedException('wrong credential');
    }
  }
}
