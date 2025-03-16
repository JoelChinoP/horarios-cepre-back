import { IsString, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShiftDto {
  @ApiProperty({
    description: 'ID del turno',
    example: 1,
  })
  @IsInt({ message: 'El id debe ser un número entero.' })
  @Min(1, { message: 'El id debe ser un número positivo.' })
  id: number;

  @ApiProperty({
    description: 'Nombre del turno',
    example: 'Turno Mañana',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del turno no puede estar vacío.' })
  name: string;

  @ApiPropertyOptional({
    description: 'Hora de inicio del turno (formato ISO 8601)',
    example: '2025-03-11T08:00:00.000Z',
  })
  @IsOptional()
  startTime?: Date;

  @ApiPropertyOptional({
    description: 'Hora de fin del turno (formato ISO 8601)',
    example: '2025-03-11T16:00:00.000Z',
  })
  @IsOptional()
  endTime?: Date;

  @ApiProperty({
    description: 'ID de la sede a la que pertenece el turno',
    example: 1,
  })
  @IsInt({ message: 'El idSede debe ser un número entero.' })
  @Min(1, { message: 'El idSede debe ser un número positivo.' })
  idSede: number;
}
