import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { users } from '@prisma/client';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly users: UsersService) {
    super();
  }

  serializeUser(user: users, done: CallableFunction) {
    done(null, user.user_id);
  }

  async deserializeUser(user_id: number, done: CallableFunction) {
    const user = await this.users.getUserById(user_id);
    done(null, user);
  }
}
