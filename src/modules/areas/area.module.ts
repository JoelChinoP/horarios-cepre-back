import { Module } from '@nestjs/common';
import { CourseController } from './area.controller';
import { CourseService } from './area.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService], //para otros modulos
})
export class AreaModule {}
