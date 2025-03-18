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
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedules.service';
import { ScheduleBaseDto, CreateScheduleDto, UpdateScheduleDto } from './dto';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('schedules')
@UseInterceptors(PrismaExceptionInterceptor)
@ApiTags('Schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo horario',
    description: 'Create a new schedule',
  })
  create(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleBaseDto> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los horarios',
    description: 'Get all schedules',
  })
  findAll(): Promise<ScheduleBaseDto[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un horario por id',
    description: 'Get a schedule by id',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ScheduleBaseDto> {
    return this.scheduleService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un horario por id',
    description: 'Update a schedule by id',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleBaseDto> {
    return this.scheduleService.update(id, UpdateScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un horario por id',
    description: 'Delete a schedule by id',
  })
  delete(@Param('id', ParseIntPipe) id: number): Promise<ScheduleBaseDto> {
    return this.scheduleService.delete(id);
  }
}
