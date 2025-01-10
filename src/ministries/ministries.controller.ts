import { Controller, Get } from '@nestjs/common';
import { MinistriesService } from './ministries.service';

@Controller('ministries')
export class MinistriesController {
  constructor(private readonly ministriesService: MinistriesService) {}

  @Get()
  async getMinistries() {
    return await this.ministriesService.getMinistries();
  }
}
