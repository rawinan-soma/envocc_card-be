import { Request } from 'express';
import { admins } from '@prisma/client';

export default interface LogInRequest extends Request {
  user: admins & { role: string };
}
