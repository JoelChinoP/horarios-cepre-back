import { OmitType, PartialType } from '@nestjs/swagger';
import { ClassDto } from './class.dto';
import { Expose } from 'class-transformer';
import { ScheduleDto } from '@modules/schedules/dto';
import { AreaDto } from '@modules/areas/dto';

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
  name: string;

  @Expose()
  monitor: {
    user: {
      id: string;
      name: string;
      lastName: string;
      phone: string | null;
      supervisor: {
        user: {
          id: string;
          name: string;
          lastName: string;
          phone: string | null;
        };
      };
    };
  };

  @Expose()
  area: AreaDto;

  @Expose()
  urlMeet?: string;

  @Expose()
  schedules: ScheduleDto[];
}
