import { admins } from '@prisma/client';
import { Request } from 'express';

interface AdminRequest extends Request {
  admin: admins & { role: string };
}

export default AdminRequest;
