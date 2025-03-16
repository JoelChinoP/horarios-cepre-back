import { Module } from '@nestjs/common';
import { AreaCourseHourController } from './area-course-hour.controller';
import { AreaCourseHourService } from './area-course-hour.service';

@Module({
  controllers: [AreaCourseHourController],
  providers: [AreaCourseHourService],
  exports: [AreaCourseHourService], //para otros modulos
})
export class AreaCourseHourModule {}
