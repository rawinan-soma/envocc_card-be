import { admins } from '@prisma/client';
import { Request } from 'express';

interface AdminRequest extends Request {
  admin: Omit<admins, 'password'>;
}

export default AdminRequest;
