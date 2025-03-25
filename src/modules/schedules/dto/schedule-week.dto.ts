import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsObject,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Weekday } from '@prisma/client';

// DTO para los bloques de clases dentro de cada día
export class DayScheduleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1,2' })
  bloque!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Historia' })
  curso!: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'juan.perez@cepr.unsa.pe' })
  docente?: string;
}

// DTO principal que representa el horario de toda la semana
export class ScheduleWeekDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '101' })
  salon!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Sociales' })
  area!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'turno 1' })
  turno!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'i101@cepr.unsa.pe' })
  monitor!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'cede central' })
  sede!: string;

  @IsObject()
  @IsArray()
  @ApiProperty({
    example: {
      lunes: [
        {
          bloque: '1,2',
          curso: 'Historia',
          docente: 'juan.perez@cepr.unsa.pe',
        },
      ],
      martes: [
        { bloque: '1', curso: 'Cívica', docente: 'carlos.ramos@cepr.unsa.pe' },
      ],
    },
  })
  days!: Record<Weekday, DayScheduleDto[]>;
}
