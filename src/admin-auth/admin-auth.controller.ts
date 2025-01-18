import {
  Controller,
  Req,
  UseGuards,
  HttpCode,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
  Res,
} from '@nestjs/common';

import { AdminAuthService } from './admin-auth.service';
import { AdminLocalCredentialGuard } from './admin-local-credential.guard';
import LogInRequest from './log-in-request.interface';
import { AdminAuthGuard } from './../common/admin-auth-guard.guard';
import { CookieAuthGuard } from 'src/common/cookie-auth.guard';

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

    return admin;
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
}
