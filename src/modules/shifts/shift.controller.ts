import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto, UpdateShiftDto } from './dto/index';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Authorization,
  Role,
} from '@modules/auth/decorators/authorization.decorator';

@ApiTags('Shifts') // Grupo en Swagger
@Controller('shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Authorization({
    roles: [Role.ADMIN],
    permission: 'shift.create',
    description: 'Crear un nuevo turno',
  })
  @ApiOperation({ summary: 'Crea un nuevo turno' })
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  @Authorization({
    roles: [Role.TEACHER, Role.SUPERVISOR, Role.MONITOR],
    permission: 'shift.getAll',
    description: 'Obtener todos los turnos',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene todos los turnos' })
  findAll() {
    return this.shiftService.findAll();
  }

  @Authorization({
    roles: [Role.TEACHER, Role.SUPERVISOR, Role.MONITOR],
    permission: 'shift.searchId',
    description: 'Busca un turno por id',
  })
  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un turno por su ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shiftService.findOne(id);
  }

  @Put(':id')
  @Authorization({
    roles: [Role.ADMIN],
    permission: 'shift.update',
    description: 'Editar un turno',
  })
  @ApiOperation({ summary: 'Actualiza un turno por su ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  @Authorization({
    roles: [Role.ADMIN],
    permission: 'shift.delete',
    description: 'Eliminar un turno',
  })
  @ApiOperation({ summary: 'Elimina un turno por su ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shiftService.remove(id);
  }
}
