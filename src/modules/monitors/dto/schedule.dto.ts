import { IsInt, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { HourSessionDto } from './hour-session.dto';
import { TeacherDto } from './teacher.dto';
import { $Enums } from '@prisma/client';

enum Weekday {
  MONDAY = 'Lunes',
  TUESDAY = 'Martes',
  WEDNESDAY = 'Miércoles',
  THURSDAY = 'Jueves',
  FRIDAY = 'Viernes',
  SATURDAY = 'Sábado',
  SUNDAY = 'Domingo',
}

export class ScheduleDto {
  @IsInt()
  id: number;

  @IsEnum(Weekday)
  weekday: $Enums.Weekday;;

  @ValidateNested()
  @Type(() => HourSessionDto)
  hourSession: HourSessionDto;

  @ValidateNested()
  @Type(() => TeacherDto)
  @IsOptional()
  teacher?: TeacherDto;
}
