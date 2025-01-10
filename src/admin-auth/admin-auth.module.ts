import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { AdminLocalStrategy } from './admin-local.strategy';
import { LocalSerializer } from './local-serializer';

@Module({
  imports: [AdminsModule, PassportModule.register({ session: true })],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminLocalStrategy, LocalSerializer],
})
export class AdminAuthModule {}
