import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ScheduleService } from './schedules.service';
import { ScheduleDto, CreateScheduleDto, UpdateScheduleDto } from './dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // ─────── CRUD ───────
  @Post('schedules')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<ScheduleDto> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('schedules')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ScheduleDto[]> {
    return this.scheduleService.findAll();
  }

  @Get('schedules/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<ScheduleDto> {
    return this.scheduleService.findOne(+id);
  }

  @Put('schedules/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() UpdateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleDto> {
    return this.scheduleService.update(+id, UpdateScheduleDto);
  }

  @Delete('schedules/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<ScheduleDto> {
    return this.scheduleService.delete(+id);
  }
}
