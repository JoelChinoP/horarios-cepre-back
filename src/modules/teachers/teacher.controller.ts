import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto';
import { Authorization } from '@modules/auth/decorators/authorization.decorator';
//import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @Authorization({
    permission: 'teacher.create',
    description: 'Crear un nuevo profesor',
  })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @Authorization({
    permission: 'teacher.list',
    description: 'Obtener todos los profesores',
  })
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  @Authorization({
    permission: 'teacher.getById',
    description: 'Obtener un profesor por su id',
  })
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Put(':id')
  @Authorization({
    permission: 'teacher.update',
    description: 'Actualizar un profesor por su id',
  })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @Authorization({
    permission: 'teacher.delete',
    description: 'Eliminar un profesor por su id',
  })
  delete(@Param('id') id: string) {
    return this.teacherService.delete(id);
  }
  /*
  @Get(':teacherId/schedules')
  @ApiOperation({
    summary: 'Obtener los horarios y aulas donde enseña un profesor',
  })
  @ApiParam({
    name: 'teacherId',
    type: 'string',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de aulas y horarios',
    type: [Object],
  })
  async getTeacherSchedules(@Param('teacherId') teacherId: string) {
    return this.teacherService.getTeacherSchedules(teacherId);
  }
 */
}
