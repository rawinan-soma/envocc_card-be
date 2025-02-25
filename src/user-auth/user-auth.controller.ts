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

@Controller('user-auth')
@UseInterceptors(ClassSerializerInterceptor)
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
  @HttpCode(200)
  @UseGuards(UserLocalGuard)
  @Post('login')
  async logIn(@Req() request: UserRequest) {
    console.log('LOGIN SESSION_ID: ', request.sessionID);
    console.log('Login complete');
    return request.session;
  }

  @HttpCode(200)
  @UseGuards(UserCookieGuard)
  @Get()
  async authentication(@Req() request: UserRequest) {
    console.log('LOGIN SESSION_ID FROM USER_AUTH: ', request.sessionID);
    // console.log('GET USER-AUTH: ', request.user);
    console.log('end USER-AUTH');
    return request.session;
  }

  @HttpCode(200)
  @UseGuards(UserCookieGuard)
  @Post('logout')
  async logOut(@Req() request: UserRequest) {
    console.log('ATTEMPT Logout by user: ', request.user);
    request.logOut((error) => {
      return error;
    });
    // response.clearCookie('connect.sid');
    request.session.cookie.maxAge = 0;
    console.log('LOGOUT complete');
    return { msg: 'logout' };
  }
}
