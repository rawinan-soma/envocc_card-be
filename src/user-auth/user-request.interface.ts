import { users } from '@prisma/client';
import { Request } from 'express';

interface UserRequest extends Request {
  user: users & { role: string };
}

export default UserRequest;
