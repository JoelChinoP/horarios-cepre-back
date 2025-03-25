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
import { AreaCourseHourService } from './area-course-hour.service';
import {
  CreateAreaCourseHourDto,
  UpdateAreaCourseHourDto,
  AreaCourseHourBaseDto,
} from './dto';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Authorization } from '@modules/auth/decorators/authorization.decorator';

@Controller('area-course-hours')
@UseInterceptors(PrismaExceptionInterceptor)
@ApiTags('AreaCourseHours')
export class AreaCourseHourController {
  constructor(private readonly areaCourseHourService: AreaCourseHourService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Authorization({
    permission: 'area-course-hour.create',
    description: 'Crear una nueva hora de curso-area',
  })
  @ApiOperation({
    summary: 'Crear una nueva hora de curso-area',
    description: 'Create a new area course hour',
  })
  create(
    @Body() createAreaCourseHourDto: CreateAreaCourseHourDto,
  ): Promise<AreaCourseHourBaseDto> {
    return this.areaCourseHourService.create(createAreaCourseHourDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Authorization({
    permission: 'area-course-hour.list',
    description: 'Obtener todas las horas de curso-area',
  })
  @ApiOperation({
    summary: 'Obtener todas las horas de curso-area',
    description: 'Get all areas course hours',
  })
  findAllAreas(): Promise<AreaCourseHourBaseDto[]> {
    return this.areaCourseHourService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Authorization({
    permission: 'area-course-hour.getById',
    description: 'Obtener una hora de curso-area por id',
  })
  @ApiOperation({
    summary: 'Obtener una hora de curso-area por id',
    description: 'Get an area course hour by id',
  })
  findOneArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AreaCourseHourBaseDto> {
    return this.areaCourseHourService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Authorization({
    permission: 'area-course-hour.update',
    description: 'Actualizar una hora de curso-area por id',
  })
  @ApiOperation({
    summary: 'Actualizar una hora de curso-area por id',
    description: 'Update an area course hour by id',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaCourseHourDto: UpdateAreaCourseHourDto,
  ): Promise<AreaCourseHourBaseDto> {
    return await this.areaCourseHourService.update(id, updateAreaCourseHourDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authorization({
    permission: 'area-course-hour.delete',
    description: 'Eliminar una hora de curso-area por id',
  })
  @ApiOperation({
    summary: 'Eliminar una hora de curso-area por id',
    description: 'Delete an area course hour by id',
  })
  deleteArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AreaCourseHourBaseDto> {
    return this.areaCourseHourService.delete(id);
  }
}
