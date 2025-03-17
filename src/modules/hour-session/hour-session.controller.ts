import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { HourSessionService } from './hour-session.service';
import { CreateHourSessionDto, UpdateHourSessionDto } from './dto/index';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Hour Sessions')
@Controller('hour-sessions')
export class HourSessionController {
  constructor(private readonly hourSessionService: HourSessionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva sesión de hora' })
  @ApiResponse({ status: 201, description: 'Sesión creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createHourSessionDto: CreateHourSessionDto) {
    return this.hourSessionService.create(createHourSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las sesiones de hora' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sesiones obtenida con éxito',
  })
  findAll() {
    return this.hourSessionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una sesión de hora por ID' })
  @ApiResponse({ status: 200, description: 'Sesión encontrada' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hourSessionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una sesión de hora' })
  @ApiResponse({ status: 200, description: 'Sesión actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHourSessionDto: UpdateHourSessionDto,
  ) {
    return this.hourSessionService.update(id, updateHourSessionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina una sesión de hora' })
  @ApiResponse({ status: 204, description: 'Sesión eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hourSessionService.remove(id);
  }
}
