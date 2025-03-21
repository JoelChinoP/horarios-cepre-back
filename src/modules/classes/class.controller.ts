import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ParseUUIDPipe,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { ClassService } from './class.service';
//import { Prisma } from '@prisma/client';
import {
  CreateClassDto,
  UpdateClassDto,
  ClassBaseDto,
  ClassForTeacherDto,
} from './dto';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Authorization,
  Role,
} from '@modules/auth/decorators/authorization.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('classes')
@UseInterceptors(PrismaExceptionInterceptor)
@ApiTags('Classes')
@UseGuards(JwtAuthGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // ─────── CRUD ───────
  @Authorization({
    description: 'GAA',
    permission: 'userProfile.create',
    roles: [Role.ADMIN],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una nueva clase',
    description: 'Create a new class',
  })
  create(@Body() createClassDto: CreateClassDto): Promise<ClassBaseDto> {
    return this.classService.create(createClassDto);
  }

  @Authorization({
    description: 'GAA',
    permission: 'userProfile.create',
    roles: [Role.ADMIN],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todas las clases',
    description: 'Get all classes',
  })
  findAll(): Promise<ClassBaseDto[]> {
    return this.classService.findAll();
  }

  @Authorization({
    description: 'Devuelve la clase del profesor',
    permission: 'userProfile.create',
    roles: [Role.ADMIN],
  })
  @Get('getClassOfTeacher')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener la clase del profito',
    description: 'Get all classes',
  })
  getClassOfTeacher(@Req() req): Promise<ClassForTeacherDto[]> {
    console.log('Usuario autenticado:', req.user); // Debugging
    const userId = req.user?.userId; // Verifica que exista

    if (!userId) {
      throw new BadRequestException('No se encontró el userId en la solicitud');
    }
    return this.classService.findClassesOfTeacher(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener una clase por id',
    description: 'Get a class by id',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ClassBaseDto> {
    return this.classService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar una clase por id',
    description: 'Update a class by id',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<ClassBaseDto> {
    return await this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar una clase por id',
    description: 'Delete a class by id',
  })
  deleteArea(@Param('id', ParseUUIDPipe) id: string): Promise<ClassBaseDto> {
    return this.classService.delete(id);
  }
}
