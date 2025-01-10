import { Controller, Get, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async getOneDepartment(@Query('ministry') ministry: number) {
    return this.departmentsService.getOneDepartment(ministry);
  }
}
