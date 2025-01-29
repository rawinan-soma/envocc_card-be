import {
  Controller,
  HttpCode,
  UseGuards,
  Post,
  Req,
  Get,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLocalGuard } from './admin-local.guard';
import AdminRequest from './admin-request.interface';
import { AdminCookieGuard } from './admin-cookie.guard';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @HttpCode(200)
  @UseGuards(AdminLocalGuard)
  @Post('login')
  async logIn(@Req() request: AdminRequest) {
    return request.session;
  }

  @HttpCode(200)
  @UseGuards(AdminCookieGuard)
  @Get()
  async authentication(@Req() request: AdminRequest) {
    return request.session;
  }

  @HttpCode(200)
  @UseGuards(AdminCookieGuard)
  @Post('logout')
  async logOut(@Req() request: AdminRequest) {
    request.logOut((error) => {
      return error;
    });

    request.session.cookie.maxAge = 0;
    return { msg: 'logout' };
  }
}
