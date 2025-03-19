//CAMBIAR POR DTOS  A FUTURO
import { ApiProperty } from '@nestjs/swagger';
import { Monitor, Sede, Shift } from '@prisma/client';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ScheduleDto } from '@modules/schedules/dto';
import { AreaDto } from '@modules/areas/dto';

// DTO para respuesta que incluye el ID
export class ClassDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  @ApiProperty({ example: 'S-213 Sociales' })
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 123 })
  idSede!: number;

  @IsOptional()
  sede: Sede; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 456 })
  areaId!: number;

  @IsOptional()
  area: AreaDto; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 789 })
  shiftId!: number;

  @IsOptional()
  shift: Shift; //CAMBIAR POR DTO A FUTURO

  @IsOptional()
  @IsString()
  @IsUUID()
  monitorId?: string;

  @IsOptional()
  monitor: Monitor; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 100 })
  capacity: number;

  @IsOptional()
  @IsString()
  @MaxLength(48)
  @ApiProperty({ example: 'https://meet.google.com/abc-123-def' })
  urlMeet?: string;

  @IsOptional()
  @ApiProperty({ type: [ScheduleDto] })
  schedules?: ScheduleDto[]; // Agregamos el DTO en lugar de la entidad
}
