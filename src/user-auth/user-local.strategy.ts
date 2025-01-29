import { UserAuthService } from './user-auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private userAuth: UserAuthService) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string) {
    return this.userAuth.getAuthenticatedUser(username, password);
  }
}
