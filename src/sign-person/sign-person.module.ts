import { Module } from '@nestjs/common';
import { SignPersonService } from './sign-person.service';
import { SignPersonController } from './sign-person.controller';

@Module({
  controllers: [SignPersonController],
  providers: [SignPersonService],
})
export class SignPersonModule {}
