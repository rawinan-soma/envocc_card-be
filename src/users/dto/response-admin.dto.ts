import { users } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserLoginResponseDto implements Partial<users> {
  user_id: number;
  username: string;
  institution: number;

  @Exclude()
  password: string;
}
