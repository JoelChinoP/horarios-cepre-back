import { OmitType, PartialType } from '@nestjs/swagger';
import { ClassDto } from './class.dto';

// DTO con propiedades comunes
export { ClassDto };

// DTO con propiedades comunes o requeridas
export class ClassBaseDto extends OmitType(ClassDto, ['id'] as const) {}

// DTO para crear un área
export class CreateClassDto extends OmitType(ClassBaseDto, [
  'sede',
  'area',
  'shift',
] as const) {}

// DTO para actualizar un área
export class UpdateClassDto extends PartialType(
  OmitType(ClassBaseDto, ['sede', 'area', 'shift'] as const),
) {}
