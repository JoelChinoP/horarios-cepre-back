import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { MonitorService } from './monitor.service';
  import { CreateMonitorDto, UpdateMonitorDto } from './dto';
  
  @Controller('monitors')
  export class MonitorController {
    constructor(private readonly monitorService: MonitorService) {}
  
    @Post()
    create(@Body() createMonitorDto: CreateMonitorDto) {
      return this.monitorService.create(createMonitorDto);
    }
  
    @Get()
    findAll() {
      return this.monitorService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.monitorService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateMonitorDto: UpdateMonitorDto) {
      return this.monitorService.update(id, updateMonitorDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.monitorService.delete(id);
    }
  }