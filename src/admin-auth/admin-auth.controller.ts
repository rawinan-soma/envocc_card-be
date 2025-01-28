import {
  Controller,
  Req,
  UseGuards,
  HttpCode,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
  Get,
} from '@nestjs/common';

import { AdminAuthService } from './admin-auth.service';
import { AdminLocalCredentialGuard } from './admin-local-credential.guard';
import LogInRequest from './log-in-request.interface';

import { CookieAuthGuard } from 'src/common/cookie-auth.guard';
import * as session from 'express-session';

@Controller('adminAuth')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminAuthController {
  private readonly logger = new Logger(AdminAuthController.name);
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @UseGuards(AdminLocalCredentialGuard)
  @HttpCode(200)
  @Post('login')
  async logIn(@Req() req: LogInRequest) {
    const admin = req.user;
    // admin.role = 'admin';
    admin.password = undefined;
    req.session.role = admin.role;
    req.session.admin_id = admin.admin_id;
    req.session.level = admin.level;

    return req.session;
  }

  @HttpCode(200)
  @Post('logout')
  @UseGuards(CookieAuthGuard)
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
    const admin = req.user;
    req.user.password = undefined;
    const cookies = req.session.cookie;

    return {
      admin_id: admin.admin_id,
      role: admin.role,
      level: admin.level,
      cookies,
    };
  }
}
