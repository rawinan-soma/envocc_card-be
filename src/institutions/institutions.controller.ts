import { Controller, Get, Query, Param } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  async getManyInstitution(
    @Query('institution_name_th') institution_name_th: string,
  ) {
    return this.institutionsService.getManyInstitution(institution_name_th);
  }

  @Get(':institution_id')
  async getOneInstitution(@Param('institution_id') institution_id: number) {
    return this.institutionsService.getOneInstitution(institution_id);
  }
}
