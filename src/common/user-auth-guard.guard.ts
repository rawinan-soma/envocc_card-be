import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CookieAuthGuard } from './cookie-auth.guard';

@Injectable()
export class UserAuthGuard extends CookieAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticate = super.canActivate(context);

    if (!isAuthenticate) {
      throw new ForbiddenException();
    }

    const request = context.switchToHttp().getRequest();

    if (request.user.role != 'user') {
      throw new UnauthorizedException();
    }

    return true;
  }
}
