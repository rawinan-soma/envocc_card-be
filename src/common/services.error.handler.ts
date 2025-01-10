import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function serviceErrorHandler(error: any) {
  if (
    error instanceof BadRequestException ||
    error instanceof NotFoundException
  ) {
    throw error;
  } else if (error instanceof PrismaClientKnownRequestError) {
    throw new InternalServerErrorException('Database connection error');
  } else {
    throw new InternalServerErrorException('Unexpected error');
  }
}
