import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    return this.validateUser(user);
  }

  protected validateUser(user: any): boolean {
    console.log('FROM COOKIEAUTH Checking user: ', user);
    return !!user && (user.role === 'user' || user.role === 'admin');
  }
}
