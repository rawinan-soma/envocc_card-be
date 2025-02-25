import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserAuthService {
  constructor(private readonly users: UsersService) {}
  public async getAuthenticatedUser(username: string, password: string) {
    try {
      const user = await this.users.getUserByUsername(username);

      await this.verifyPassword(password, user.password);
      await this.checkUserValidation(user);

      return user;
    } catch (error) {
      console.log(error);
      // FIXME:
      throw error;
    }
  }

  private async checkUserValidation(user: any) {
    if (user.is_validate === false) {
      throw new UnauthorizedException('User did not validate by Admin');
    }
  }

  private async verifyPassword(inputPassword: string, storePassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      inputPassword,
      storePassword,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('wrong credential');
    }
  }
}
