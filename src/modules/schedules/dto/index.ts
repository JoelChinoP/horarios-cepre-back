import { ScheduleBaseDto } from './schedule-base.dto';

// DTO para crear un área
export class CreateScheduleDto extends ScheduleBaseDto {}

// DTO para actualizar un área
import { PartialType } from '@nestjs/mapped-types';
export class UpdateScheduleDto extends PartialType(ScheduleBaseDto) {}

// DTO para respuesta que incluye el ID
export { ScheduleDto } from './schedule.dto';

// DTO base con propiedades comunes
export { ScheduleBaseDto };
