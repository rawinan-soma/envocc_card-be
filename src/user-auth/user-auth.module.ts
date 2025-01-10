import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UserLocalStrategy } from './user-local.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalSerializer } from './local-serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserLocalStrategy, LocalSerializer],
})
export class UserAuthModule {}
