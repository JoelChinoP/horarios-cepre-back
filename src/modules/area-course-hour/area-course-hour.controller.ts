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
  AreaCourseHourDto,
} from './dto';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';
import { ApiOperation } from '@nestjs/swagger';

@Controller('area-course-hours')
@UseInterceptors(PrismaExceptionInterceptor)
export class AreaCourseHourController {
  constructor(private readonly areaCourseHourService: AreaCourseHourService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create a new area course hour' })
  create(
    @Body() createAreaCourseHourDto: CreateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    return this.areaCourseHourService.create(createAreaCourseHourDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get all areas course hours' })
  findAllAreas(): Promise<AreaCourseHourDto[]> {
    return this.areaCourseHourService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get an area course hour by id' })
  findOneArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AreaCourseHourDto> {
    return this.areaCourseHourService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update an area course hour by id' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaCourseHourDto: UpdateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    return await this.areaCourseHourService.update(id, updateAreaCourseHourDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete an area course hour by id' })
  deleteArea(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AreaCourseHourDto> {
    return this.areaCourseHourService.delete(id);
  }
}
