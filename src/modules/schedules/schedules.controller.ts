import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ScheduleService } from './schedules.service';
import { Prisma } from '@prisma/client';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // ─────── SCHEDULE ───────
  @Post('schedules')
  createSchedule(@Body() data: Prisma.ScheduleCreateInput) {
    return this.scheduleService.createSchedule(data);
  }

  @Get('schedules')
  findAllSchedules() {
    return this.scheduleService.findAllSchedules();
  }

  @Get('schedules/:id')
  findOneSchedule(@Param('id') id: string) {
    return this.scheduleService.findOneSchedule(+id);
  }

  @Put('schedules/:id')
  updateSchedule(
    @Param('id') id: string,
    @Body() data: Prisma.ScheduleUpdateInput,
  ) {
    return this.scheduleService.updateSchedule(+id, data);
  }

  @Delete('schedules/:id')
  deleteSchedule(@Param('id') id: string) {
    return this.scheduleService.deleteSchedule(+id);
  }
}
