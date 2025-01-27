import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { RequestsModule } from './requests/requests.module';
import { MembersModule } from './members/members.module';
import { DocumentsModule } from './documents/documents.module';
import { EnvcardModule } from './envcard/envcard.module';
import { ExpfileModule } from './expfile/expfile.module';
import { MinistriesModule } from './ministries/ministries.module';
import { DepartmentsModule } from './departments/departments.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ExpsfileModule } from './expsfile/expsfile.module';
import { GovcardModule } from './govcard/govcard.module';
import { PhotosModule } from './photos/photos.module';

import * as Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module';
import { PositionsModule } from './positions/positions.module';
import { PositionLvlsModule } from './position-lvls/position-lvls.module';
import { SignPersonModule } from './sign-person/sign-person.module';
import { FilesModule } from './files/files.module';
// import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DB: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
      }),
    }),
    UsersModule,
    AdminsModule,
    UserAuthModule,
    AdminAuthModule,
    RequestsModule,
    MembersModule,
    DocumentsModule,
    EnvcardModule,
    ExpfileModule,
    MinistriesModule,
    DepartmentsModule,
    InstitutionsModule,
    ExperiencesModule,
    ExpsfileModule,
    GovcardModule,
    PhotosModule,
    PrismaModule,
    PositionsModule,
    PositionLvlsModule,
    SignPersonModule,
    FilesModule,
    // QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
