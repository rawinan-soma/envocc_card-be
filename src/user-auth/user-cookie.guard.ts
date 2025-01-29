import { Injectable } from '@nestjs/common';
import { CookieAuthGuard } from 'src/common/cookie-auth.guard';

@Injectable()
export class UserCookieGuard extends CookieAuthGuard {
  protected validateUser(user: any): boolean {
    return user?.role === 'user';
  }
}
