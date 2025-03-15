import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { Weekday } from '@prisma/client';

// DTO base con propiedades comunes
export class ScheduleBaseDto {
  @IsNotEmpty()
  @IsString()
  classId!: string;

  @IsNotEmpty()
  @IsNumber()
  hourSessionId!: number;

  @IsNotEmpty()
  @IsString()
  teacherId!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  weekday!: Weekday;
}
