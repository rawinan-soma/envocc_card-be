import { PartialType } from '@nestjs/mapped-types';
import { CreateGovcardDto } from './create-govcard.dto';

export class UpdateGovcardDto extends PartialType(CreateGovcardDto) {}
