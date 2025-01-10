import { Controller, Get, Query } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  async getOneInstitution(
    @Query('institution_name_th') institution_name_th: string,
  ) {
    return this.institutionsService.getOneInstitution(institution_name_th);
  }
}
