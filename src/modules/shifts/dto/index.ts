import { OmitType } from '@nestjs/swagger';
import { ShiftDto } from './shift.dto';

// Exportar el DTO principal
export { ShiftDto };

// DTO base sin el ID (para evitar que se pase en creaciones o actualizaciones)
export class ShiftBaseDto extends OmitType(ShiftDto, ['id'] as const) {}

// DTO para crear un turno (sin ID)
export class CreateShiftDto extends ShiftBaseDto {}

// DTO para actualizar un turno
export class UpdateShiftDto extends ShiftBaseDto {}
