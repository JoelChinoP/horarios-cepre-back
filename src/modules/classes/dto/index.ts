import { OmitType, PartialType } from '@nestjs/swagger';
import { ClassDto } from './class.dto';
import { ClassForTeacherDto } from './classForTeacher.dto';
// DTO con propiedades comunes
export { ClassDto };

// DTO con propiedades comunes o requeridas
export class ClassBaseDto extends OmitType(ClassDto, [
  'areaId',
  'shiftId',
  'monitorId',
  'schedules',
] as const) {}

// DTO para crear un área
export class CreateClassDto extends OmitType(ClassDto, [
  'id',
  'sede',
  'area',
  'shift',
  'monitor',
  'schedules',
] as const) {}

// DTO para actualizar un área
export class UpdateClassDto extends PartialType(
  OmitType(ClassDto, [
    'id',
    'sede',
    'area',
    'shift',
    'monitor',
    'schedules',
  ] as const),
) {}

export { ClassForTeacherDto };
