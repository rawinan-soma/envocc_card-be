import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { AdminsService } from 'src/admins/admins.service';
// import { AdminSerializer } from './admin-serializer';
import { AdminLocalStrategy } from './admin-local.strategy';
import { SessionSerializer } from 'src/common/session-serializer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AdminsModule,
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  controllers: [AdminAuthController],
  providers: [
    AdminAuthService,
    AdminsService,
    SessionSerializer,
    AdminLocalStrategy,
  ],
})
export class AdminAuthModule {}
