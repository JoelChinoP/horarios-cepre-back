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
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto, UpdateAreaDto, AreaBaseDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';
//import { ApiCreatedResponse } from '@nestjs/swagger';
//import { ApiResponse } from '@nestjs/swagger';

@Controller('areas')
@UseInterceptors(PrismaExceptionInterceptor)
@ApiTags('Areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo area',
    description: 'Create a new area',
  })
  create(@Body() createAreaDto: CreateAreaDto): Promise<AreaBaseDto> {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todas las areas',
    description: 'Get all areas',
  })
  findAll(): Promise<AreaBaseDto[]> {
    return this.areaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un area por id',
    description: 'Get an area by id',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AreaBaseDto> {
    return this.areaService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un area por id',
    description: 'Update an area by id',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<AreaBaseDto> {
    return await this.areaService.update(id, updateAreaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un area por id',
    description: 'Delete an area by id',
  })
  delete(@Param('id', ParseIntPipe) id: number): Promise<AreaBaseDto> {
    return this.areaService.delete(id);
  }
}
