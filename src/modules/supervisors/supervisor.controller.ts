import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { SupervisorService } from './supervisor.service';
  import { CreateSupervisorDto, UpdateSupervisorDto } from './dto';
  
  @Controller('supervisors')
  export class SupervisorController {
    constructor(private readonly supervisorService: SupervisorService) {}
  
    @Post()
    create(@Body() createSupervisorDto: CreateSupervisorDto) {
      return this.supervisorService.create(createSupervisorDto);
    }
  
    @Get()
    findAll() {
      return this.supervisorService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.supervisorService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateSupervisorDto: UpdateSupervisorDto) {
      return this.supervisorService.update(id, updateSupervisorDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.supervisorService.delete(id);
    }
  }