import {
  Controller,
  Get,
  Post,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { UserLocalGuard } from 'src/user-auth/user-local.guard';
import { UserCookieGuard } from 'src/user-auth/user-cookie.guard';
import UserRequest from 'src/user-auth/user-request.interface';
import { Response } from 'express';

@Controller('user-auth')
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
  @HttpCode(200)
  @UseGuards(UserLocalGuard)
  @Post('login')
  async logIn(@Req() request: UserRequest) {
    return request.session;
  }

  @HttpCode(200)
  @UseGuards(UserCookieGuard)
  @Get()
  async authentication(@Req() request: UserRequest) {
    return request.session;
  }

  @HttpCode(200)
  @UseGuards(UserCookieGuard)
  @Post('logout')
  async logOut(@Req() request: UserRequest) {
    request.logOut((error) => {
      return error;
    });
    // response.clearCookie('connect.sid');
    request.session.cookie.maxAge = 0;

    return { msg: 'logout' };
  }
}
