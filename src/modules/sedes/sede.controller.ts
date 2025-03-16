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
import { SedeService } from './sede.service';
import { CreateSedeDto, UpdateSedeDto } from './dto/index';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Sedes')
@Controller('sedes')
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea una nueva sede' })
  @ApiResponse({ status: 201, description: 'Sede creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createSedeDto: CreateSedeDto) {
    return this.sedeService.create(createSedeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las sedes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sedes obtenida con éxito',
  })
  findAll() {
    return this.sedeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una sede por ID' })
  @ApiResponse({ status: 200, description: 'Sede encontrada' })
  @ApiResponse({ status: 404, description: 'Sede no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sedeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una sede' })
  @ApiResponse({ status: 200, description: 'Sede actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Sede no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSedeDto: UpdateSedeDto,
  ) {
    return this.sedeService.update(id, updateSedeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Elimina una sede' })
  @ApiResponse({ status: 204, description: 'Sede eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Sede no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sedeService.remove(id);
  }
}
