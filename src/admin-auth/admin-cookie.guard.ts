import { Injectable } from '@nestjs/common';
import { CookieAuthGuard } from 'src/common/cookie-auth.guard';

@Injectable()
export class AdminCookieGuard extends CookieAuthGuard {
  protected validateUser(user: any): boolean {
    console.log('ValidateADMIN - COOKIEAUTH', user?.role === 'admin');
    console.log('VERIFIED: Complete');
    return user?.role === 'admin';
  }
}
