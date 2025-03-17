import { OmitType } from '@nestjs/swagger';
import { HourSessionDto } from './hour-session.dto';

// Exportación de todos los DTOs
export { HourSessionDto };

// DTO base sin ID y sin duración
export class HourSessionBaseDto extends OmitType(HourSessionDto, [
  'id',
  'durationMinutes',
] as const) {}

// DTO para crear una sesión de hora (sin ID y sin duración)
export class CreateHourSessionDto extends HourSessionBaseDto {}

// DTO para actualizar una sesión de hora (con duracion)
export class UpdateHourSessionDto extends HourSessionBaseDto {}
