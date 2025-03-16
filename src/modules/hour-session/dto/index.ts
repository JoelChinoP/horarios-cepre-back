import { OmitType, PartialType } from '@nestjs/swagger';
import { HourSessionDto } from './hour-session.dto';

// DTO base sin ID y sin duración
export class HourSessionBaseDto extends OmitType(HourSessionDto, [
  'id',
  'durationMinutes',
] as const) {}

// DTO para crear una sesión de hora (sin ID y sin duración)
export class CreateHourSessionDto extends HourSessionBaseDto {}

// DTO para actualizar una sesión de hora (sin ID, sin duración y con campos opcionales)
export class UpdateHourSessionDto extends PartialType(HourSessionBaseDto) {}

// Exportación de todos los DTOs
export { HourSessionDto };
