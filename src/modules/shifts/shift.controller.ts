import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto, UpdateShiftDto } from './dto/index';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Shifts') // Grupo en Swagger
@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo turno' })
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los turnos' })
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un turno por su ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shiftService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un turno por su ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un turno por su ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shiftService.remove(id);
  }
}
