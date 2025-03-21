import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Delete,
    
    Req,
  } from '@nestjs/common';
  import { MonitorService } from './monitor.service';
  import { CreateMonitorDto, UpdateMonitorDto } from './dto';
import { ScheduleDto } from './dto/schedule.dto';
import { Authorization, Role } from '@modules/auth/decorators/authorization.decorator';

  
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
    @Authorization({
      description: 'GAA',
      permission: 'monitor.schedule',
      roles: [Role.ADMIN],
    })
    @Get('schedule')
    async getSchedule(@Req() req): Promise<ScheduleDto[]> {
      const userId = req.user['id']; // Obtenemos el ID del usuario desde el token
      return this.monitorService.getSchedule(userId);
    }

  }