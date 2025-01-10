import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GovcardService } from './govcard.service';
import { CreateGovcardDto } from './dto/create-govcard.dto';
import { UpdateGovcardDto } from './dto/update-govcard.dto';

@Controller('govcard')
export class GovcardController {
  constructor(private readonly govcardService: GovcardService) {}
}
