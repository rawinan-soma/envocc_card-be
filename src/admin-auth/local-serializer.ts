import { admins } from '@prisma/client';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly adminsService: AdminsService) {
    super();
  }

  async serializeUser(admin: admins, done: CallableFunction) {
    done(null, admin.admin_id);
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    const admin = await this.adminsService.getAdminById(userId);
    done(null, admin);
  }
}
