import { UsersService } from '../users/users.service';
import { users } from '@prisma/client';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async serializeUser(user: users, done: CallableFunction) {
    done(null, user.user_id);
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    const user = await this.usersService.getUserById(userId);
    done(null, user);
  }
}
