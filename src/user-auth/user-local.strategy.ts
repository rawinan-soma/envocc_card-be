import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { users } from '@prisma/client';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'local-user',
) {
  private readonly logger = new Logger(UserLocalStrategy.name);
  constructor(private readonly userAuthService: UserAuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<users> {
    try {
      const user = await this.userAuthService.getAuthenticatedUser(
        username,
        password,
      );

      if (!user) {
        throw new UnauthorizedException();
      }

      return user; // Ensure a full user object is returned here
    } catch (error) {
      this.logger.error('Error during user validation', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
