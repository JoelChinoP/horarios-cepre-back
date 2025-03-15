import { PartialType } from '@nestjs/mapped-types';
import { AreaCourseHourBaseDto } from './area-course-hour-base.dto';

// DTO para crear un área
export class CreateAreaCourseHourDto extends AreaCourseHourBaseDto {}

// DTO para actualizar un área
export class UpdateAreaCourseHourDto extends PartialType(
  AreaCourseHourBaseDto,
) {}

// DTO para respuesta que incluye el ID
export { AreaCourseHourDto } from './area-course-hour.dto';

// DTO base con propiedades comunes
export { AreaCourseHourBaseDto };
