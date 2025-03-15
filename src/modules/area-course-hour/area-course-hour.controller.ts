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
} from '@nestjs/common';
import { AreaCourseHourService } from './area-course-hour.service';
import {
  CreateAreaCourseHourDto,
  UpdateAreaCourseHourDto,
  AreaCourseHourDto,
} from './dto';

@Controller('areas')
export class AreaCourseHourController {
  constructor(private readonly areaCourseHourService: AreaCourseHourService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createArea(
    @Body() createAreaCourseHourDto: CreateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    return this.areaCourseHourService.create(createAreaCourseHourDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllAreas(): Promise<AreaCourseHourDto[]> {
    return this.areaCourseHourService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneArea(@Param('id') id: string): Promise<AreaCourseHourDto> {
    return this.areaCourseHourService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateAreaCourseHourDto: UpdateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    return await this.areaCourseHourService.update(
      +id,
      updateAreaCourseHourDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArea(@Param('id') id: string): Promise<AreaCourseHourDto> {
    return this.areaCourseHourService.delete(+id);
  }
}
