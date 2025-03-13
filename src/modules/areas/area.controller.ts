import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CourseService } from './area.service';
import { Prisma } from '@prisma/client';

@Controller('course')
export class CourseController {
  constructor(private readonly academicService: CourseService) {}

  // ─────── AREA ───────
  @Post('areas')
  createArea(@Body() data: Prisma.AreaCreateInput) {
    return this.academicService.createArea(data);
  }

  @Get('areas')
  findAllAreas() {
    return this.academicService.findAllAreas();
  }

  @Get('areas/:id')
  findOneArea(@Param('id') id: string) {
    return this.academicService.findOneArea(+id);
  }

  @Put('areas/:id')
  updateArea(@Param('id') id: string, @Body() data: Prisma.AreaUpdateInput) {
    return this.academicService.updateArea(+id, data);
  }

  @Delete('areas/:id')
  deleteArea(@Param('id') id: string) {
    return this.academicService.deleteArea(+id);
  }

  // ─────── AREA COURSE HOUR ───────
  @Post('area-course-hours')
  createAreaCourseHour(@Body() data: Prisma.AreaCourseHourCreateInput) {
    return this.academicService.createAreaCourseHour(data);
  }

  @Get('area-course-hours')
  findAllAreaCourseHours() {
    return this.academicService.findAllAreaCourseHours();
  }

  @Get('area-course-hours/:id')
  findOneAreaCourseHour(@Param('id') id: string) {
    return this.academicService.findOneAreaCourseHour(+id);
  }

  @Put('area-course-hours/:id')
  updateAreaCourseHour(
    @Param('id') id: string,
    @Body() data: Prisma.AreaCourseHourUpdateInput,
  ) {
    return this.academicService.updateAreaCourseHour(+id, data);
  }

  @Delete('area-course-hours/:id')
  deleteAreaCourseHour(@Param('id') id: string) {
    return this.academicService.deleteAreaCourseHour(+id);
  }
}
