import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma/prisma.module';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
