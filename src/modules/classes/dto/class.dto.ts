//CAMBIAR POR DTOS  A FUTURO
import { Area, Sede, Shift } from '@prisma/client';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

// DTO para respuesta que incluye el ID
export class ClassDto {
  @IsNotEmpty()
  @IsString()
  readonly id!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  idSede!: number;

  @IsOptional()
  sede: Sede; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsNumber()
  areaId!: number;

  @IsOptional()
  area: Area; //CAMBIAR POR DTO A FUTURO

  @IsNotEmpty()
  @IsNumber()
  shiftId!: number;

  @IsOptional()
  shift: Shift; //CAMBIAR POR DTO A FUTURO

  @IsOptional()
  @IsNumber()
  @IsPositive()
  capacity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(48)
  urlMeet?: string;
}
