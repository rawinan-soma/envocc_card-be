import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
// import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserSerializer } from './user-serializer';
import { ExperiencesModule } from 'src/experiences/experiences.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UserLocalStrategy } from './user-local.strategy';
import { SessionSerializer } from 'src/common/session-serializer';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    ExperiencesModule,
    AdminsModule,
  ],
  controllers: [UserAuthController],
  providers: [
    UserAuthService,
    UsersService,
    SessionSerializer,
    UserLocalStrategy,
  ],
})
export class UserAuthModule {}
