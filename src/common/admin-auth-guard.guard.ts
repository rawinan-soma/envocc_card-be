import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { CookieAuthGuard } from './cookie-auth.guard';

@Injectable()
export class AdminAuthGuard extends CookieAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticate = super.canActivate(context);

    if (!isAuthenticate) {
      throw new ForbiddenException('Admin is not authenticate');
    }

    const request = context.switchToHttp().getRequest();

    console.log('The role is: ', request);

    if (request.user.role != 'admin') {
      throw new UnauthorizedException();
    }

    return true;
  }
}
