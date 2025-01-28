import {
  Controller,
  Post,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';

import { UserLocalCredentialGuard } from './user-local-credential.guard';
import LogInRequest from './log-in-request.interface';

import { CookieAuthGuard } from 'src/common/cookie-auth.guard';

@Controller('userAuth')
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @UseGuards(UserLocalCredentialGuard)
  @HttpCode(200)
  @Post('login')
  async logIn(@Req() req: LogInRequest) {
    const user = req.user;
    user.password = undefined;
    req.session.role = user.role;
    req.session.user_id = user.user_id;

    return req.session;
  }

  @UseGuards(CookieAuthGuard)
  @HttpCode(200)
  @Post('logout')
  async logOut(@Req() req: LogInRequest) {
    req.logout(function (err) {
      if (err) {
        return err;
      }
    });
    req.session.cookie.maxAge = 0;
    return { msg: `Logout successfully` };
  }

  @Get('sessions')
  @UseGuards(CookieAuthGuard)
  async checkSession(@Req() req: LogInRequest) {
    const user = req.user;
    req.user.password = undefined;
    const cookies = req.session.cookie;

    return {
      user_id: user.user_id,
      role: user.role,
      cookies,
    };
  }
}
