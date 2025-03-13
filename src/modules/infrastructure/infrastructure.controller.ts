import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { Prisma } from '@prisma/client';

@Controller('infrastructure')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}

  // ─────── AREA ───────
  @Post('areas')
  createArea(@Body() data: Prisma.AreaCreateInput) {
    return this.infrastructureService.createArea(data);
  }

  @Get('areas')
  findAllAreas() {
    return this.infrastructureService.findAllAreas();
  }

  @Get('areas/:id')
  findOneArea(@Param('id') id: string) {
    return this.infrastructureService.findOneArea(+id);
  }

  @Put('areas/:id')
  updateArea(@Param('id') id: string, @Body() data: Prisma.AreaUpdateInput) {
    return this.infrastructureService.updateArea(+id, data);
  }

  @Delete('areas/:id')
  deleteArea(@Param('id') id: string) {
    return this.infrastructureService.deleteArea(+id);
  }

  // ─────── AREA COURSE HOUR ───────
  @Post('area-course-hours')
  createAreaCourseHour(@Body() data: Prisma.AreaCourseHourCreateInput) {
    return this.infrastructureService.createAreaCourseHour(data);
  }

  @Get('area-course-hours')
  findAllAreaCourseHours() {
    return this.infrastructureService.findAllAreaCourseHours();
  }

  @Get('area-course-hours/:id')
  findOneAreaCourseHour(@Param('id') id: string) {
    return this.infrastructureService.findOneAreaCourseHour(+id);
  }

  @Put('area-course-hours/:id')
  updateAreaCourseHour(
    @Param('id') id: string,
    @Body() data: Prisma.AreaCourseHourUpdateInput,
  ) {
    return this.infrastructureService.updateAreaCourseHour(+id, data);
  }

  @Delete('area-course-hours/:id')
  deleteAreaCourseHour(@Param('id') id: string) {
    return this.infrastructureService.deleteAreaCourseHour(+id);
  }
}
