import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ExperiencesModule } from 'src/experiences/experiences.module';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [ExperiencesModule, RequestsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
