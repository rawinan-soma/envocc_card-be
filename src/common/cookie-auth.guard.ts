import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './user-roles.enum';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // return request.isAuthenticated();

    // console.log(request.session);
    // console.log(request.user);

    if (!request.isAuthenticated()) {
      throw new ForbiddenException('Users not authenticate');
    }

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const userRole = request.user.role;

    if (!roles.includes(userRole)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
