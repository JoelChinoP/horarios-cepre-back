import { OmitType } from '@nestjs/swagger';
import { CourseDto } from './course.dto';

// Exportación de todos los DTOs
export { CourseDto };

// DTO base sin ID
export class CourseBaseDto extends OmitType(CourseDto, ['id'] as const) {}

// DTO para crear un curso (sin ID)
export class CreateCourseDto extends CourseBaseDto {}

// DTO para actualizar un curso
export class UpdateCourseDto extends CourseBaseDto {}
