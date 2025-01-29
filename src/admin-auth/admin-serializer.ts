import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { admins } from '@prisma/client';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AdminSerializer extends PassportSerializer {
  constructor(private readonly admins: AdminsService) {
    super();
  }

  serializeUser(user: admins, done: CallableFunction) {
    done(null, user.admin_id);
  }

  async deserializeUser(user_id: number, done: CallableFunction) {
    const user = await this.admins.getAdminById(user_id);
    done(null, user);
  }
}
