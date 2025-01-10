import { admins } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AdminLoginResponseDto implements Partial<admins> {
  admin_id: number;
  username: string;
  level: number;
  institution: number;

  @Exclude()
  password: string;
}
