import { ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

import { Type } from 'class-transformer';
import { CreateExperienceDto } from '../../experiences/dto/create-experience.dto';

export class CreateMainDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ValidateNested({ each: true })
  @Type(() => CreateExperienceDto)
  experiences: CreateExperienceDto[];
}
