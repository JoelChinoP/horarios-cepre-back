import { IsString, IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Weekday {
  MONDAY = 'Lunes',
  TUESDAY = 'Martes',
  WEDNESDAY = 'Miercoles',
  THURSDAY = 'Jueves',
  FRIDAY = 'Viernes',
  SATURDAY = 'Sabado',
  SUNDAY = 'Domingo',
}
export class ScheduleDto {
  @IsEnum(Weekday)
  weekday: Weekday;

  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @IsString()
  @IsNotEmpty()
  courseName: string;
}