import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async getOneDepartment(@Query('ministry', ParseIntPipe) ministry: number) {
    return this.departmentsService.getOneDepartment(ministry);
  }
}
