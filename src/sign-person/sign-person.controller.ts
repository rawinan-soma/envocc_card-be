import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignPersonService } from './sign-person.service';
import { CreateSignPersonDto } from './dto/create-sign-person.dto';
import { UpdateSignPersonDto } from './dto/update-sign-person.dto';

@Controller('sign-person')
export class SignPersonController {
  constructor(private readonly signPersonService: SignPersonService) {}

  @Post()
  create(@Body() createSignPersonDto: CreateSignPersonDto) {
    return this.signPersonService.create(createSignPersonDto);
  }

  @Get()
  findAll() {
    return this.signPersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signPersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignPersonDto: UpdateSignPersonDto) {
    return this.signPersonService.update(+id, updateSignPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signPersonService.remove(+id);
  }
}
