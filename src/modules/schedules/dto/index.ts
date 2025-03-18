import { PartialType, OmitType } from '@nestjs/swagger';
import { ScheduleDto } from './schedule.dto';

// DTO idéntico al ScheduleDto
export { ScheduleDto };

// DTO base con propiedades comunes
export class ScheduleBaseDto extends OmitType(ScheduleDto, [
  'classId',
  'hourSessionId',
  'teacherId',
]) {}

// DTO para crear un área
export class CreateScheduleDto extends OmitType(ScheduleDto, [
  'id',
  'clas',
  'hourSession',
  'teacher',
] as const) {}

// DTO para actualizar un área
export class UpdateScheduleDto extends PartialType(
  OmitType(ScheduleDto, ['id', 'clas', 'hourSession', 'teacher'] as const),
) {}
