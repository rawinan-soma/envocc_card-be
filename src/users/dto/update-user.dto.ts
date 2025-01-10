import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['username'] as const),
) {}

export class ValidateUserDto extends UpdateUserDto {
  is_validate: boolean;
}
