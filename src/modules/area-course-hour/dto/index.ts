import { OmitType, PartialType } from '@nestjs/swagger';
import { AreaCourseHourDto } from './area-course-hour.dto';

// Dto con propiedades comunes
export { AreaCourseHourDto };

// DTO con propiedades comunes o requeridas
export class AreaCourseHourBaseDto extends OmitType(AreaCourseHourDto, [
  'id',
] as const) {}

// DTO para crear un área
export class CreateAreaCourseHourDto extends OmitType(AreaCourseHourBaseDto, [
  'area',
  'course',
] as const) {}

// DTO para actualizar un área
export class UpdateAreaCourseHourDto extends PartialType(
  OmitType(AreaCourseHourBaseDto, ['area', 'course'] as const),
) {}
