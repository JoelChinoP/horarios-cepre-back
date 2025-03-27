import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
  @ApiProperty({ example: 'juan.perez@cepr.unsa.pe', required: false })
  docente?: string;
}

export class DayDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Lunes' })
  dia!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayScheduleDto)
  @ApiProperty({
    example: [
      {
        bloque: '1,2',
        curso: 'Historia',
        docente: 'juan.perez@cepr.unsa.pe',
      },
      {
        bloque: '3',
        curso: 'Filosofía',
        docente: 'maria.lopez@cepr.unsa.pe',
      },
    ],
  })
  clases!: DayScheduleDto[];
}

export class ScheduleWeekDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '101I-Ingenierías' })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'sociales' })
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayDto)
  @ApiProperty({
    example: [
      {
        dia: 'Lunes',
        clases: [
          {
            bloque: '1,2',
            curso: 'Historia',
            docente: 'juan.perez@cepr.unsa.pe',
          },
          {
            bloque: '3',
            curso: 'Filosofía',
            docente: 'maria.lopez@cepr.unsa.pe',
          },
        ],
      },
      {
        dia: 'Martes',
        clases: [
          {
            bloque: '1',
            curso: 'Cívica',
            docente: 'carlos.ramos@cepr.unsa.pe',
          },
          {
            bloque: '2,3',
            curso: 'Psicología',
            docente: 'lucia.salas@cepr.unsa.pe',
          },
        ],
      },
    ],
  })
  horarios!: DayDto[];
}
