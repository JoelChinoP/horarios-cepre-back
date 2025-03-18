import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Class, HourSession, Teacher, Weekday } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

// DTO para respuesta que incluye el ID
export class ScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 123 })
  readonly id!: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  classId!: string;

  @IsOptional()
  clas: Class; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 456 })
  hourSessionId!: number;

  @IsOptional()
  hourSession: HourSession; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  teacherId!: string;

  @IsOptional()
  teacher: Teacher; //CAMBIAR POR DTO A FUTURO

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Weekday)
  @ApiProperty({ example: 'Lunes' })
  weekday!: Weekday;
}
