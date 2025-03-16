import { IsInt, IsNotEmpty, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HourSessionDto {
  @ApiPropertyOptional({ description: 'ID de la sesión de hora', example: 1 })
  @IsInt({ message: 'id debe ser un número entero.' })
  @Min(1, { message: 'id debe ser un número positivo.' })
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'ID del turno al que pertenece la sesión',
    example: 1,
  })
  @IsInt({ message: 'shiftId debe ser un número entero.' })
  @Min(1, { message: 'shiftId debe ser un número positivo.' })
  @IsNotEmpty({ message: 'shiftId es obligatorio.' })
  shiftId: number;

  @ApiProperty({
    description: 'Número de periodo dentro del turno',
    example: 2,
  })
  @IsInt({ message: 'period debe ser un número entero.' })
  @Min(1, { message: 'period debe ser un número positivo.' })
  @IsNotEmpty({ message: 'period es obligatorio.' })
  period: number;

  @ApiProperty({
    description: 'Hora de inicio de la sesión',
    example: '12:30:00',
  })
  @IsNotEmpty({ message: 'startTime es obligatorio.' })
  startTime: string;

  @ApiProperty({
    description: 'Hora de fin de la sesión',
    example: '13:10:00',
  })
  @IsNotEmpty({ message: 'endTime es obligatorio.' })
  endTime: string;

  @ApiPropertyOptional({
    description: 'Duración en minutos de la sesión',
    example: 40,
  })
  @IsInt({ message: 'durationMinutes debe ser un número entero.' })
  @Min(1, { message: 'durationMinutes debe ser un número positivo.' })
  @IsOptional()
  durationMinutes?: number;
}
