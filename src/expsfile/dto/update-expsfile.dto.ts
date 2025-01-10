import { PartialType } from '@nestjs/mapped-types';
import { CreateExpsfileDto } from './create-expsfile.dto';

export class UpdateExpsfileDto extends PartialType(CreateExpsfileDto) {}
