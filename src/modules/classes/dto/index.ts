import { OmitType, PartialType } from '@nestjs/swagger';
import { ClassDto } from './class.dto';
import { Expose } from 'class-transformer';

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

export class ClassesForProfesor extends OmitType(ClassDto, [
  'monitor', // Puedes incluirlo si lo necesitas
] as const) {
  @Expose()
  areaId: number;

  @Expose()
  shiftId: number;

  @Expose()
  monitorId: string;

  @Expose()
  idSede: number;

  @Expose()
  sede: {
    id: number;
    name: string;
    description: string | null;
    phone: string | null;
  };
}
