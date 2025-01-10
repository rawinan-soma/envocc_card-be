import { Request } from 'express';
import { users } from '@prisma/client';

// type roledUsers = users & { role: string };

export default interface LogInRequest extends Request {
  user: users & { role: string };
  // user: roledUsers;
}
