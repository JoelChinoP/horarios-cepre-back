import { AreaCourseHourBaseDto } from './area-course-hour-base.dto';
import { IsNumber } from 'class-validator';

// DTO para respuesta que incluye el ID
export class AreaCourseHourDto extends AreaCourseHourBaseDto {
  @IsNumber()
  readonly id!: number;
}
