import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto, UpdateMonitorDto } from './dto';
import { ScheduleDto } from './dto/schedule.dto';
import {
  Authorization,
  Role,
} from '@modules/auth/decorators/authorization.decorator';
import { Unauthenticated } from '@modules/auth/decorators/unauthenticated.decorator';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';

@Controller('monitors')
@UseInterceptors(PrismaExceptionInterceptor)
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

  @Unauthenticated()
  @Get(':id/')
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
    roles: [Role.TEACHER, Role.SUPERVISOR, Role.MONITOR],
    permission: 'monitor.schedule',
    description: 'zzzz',
  })
  @Get('/cargar/horario')
  getSchedule(@Req() req): Promise<ScheduleDto[]> {
    console.log('Usuario autenticado:', req.user);
    const userId = req.user?.userId; // Obtenemos el ID del usuario desde el token
    return this.monitorService.getSchedule(userId);
  }
}
