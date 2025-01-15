import { PartialType } from '@nestjs/mapped-types';
import { CreateSignPersonDto } from './create-sign-person.dto';

export class UpdateSignPersonDto extends PartialType(CreateSignPersonDto) {}
