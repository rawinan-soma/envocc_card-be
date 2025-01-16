import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user-roles.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
