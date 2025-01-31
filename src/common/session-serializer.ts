import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AdminsService } from 'src/admins/admins.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly users: UsersService,
    private readonly admins: AdminsService,
  ) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    // console.log('FROM Serializer', user);
    console.log({
      id: user.user_id || user.admin_id,
      role: user.role,
      level: user.level ? user.level : null,
    });
    done(null, {
      id: user.user_id || user.admin_id,
      role: user.role,
      level: user.level ? user.level : null,
    });
  }

  async deserializeUser(payload: any, done: CallableFunction) {
    try {
      console.log('FROM Deserializer', payload);
      let user: any;

      if (payload.role === 'user') {
        user = await this.users.getUserById(payload.id);
      } else if (payload.role === 'admin') {
        user = await this.admins.getAdminById(payload.id);
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
