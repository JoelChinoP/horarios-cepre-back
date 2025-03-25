import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    description: 'Hora de inicio de la sesión',
    example: '12:30:00',
  })
  @IsNotEmpty({ message: 'startTime es obligatorio.' })
  startTime: string;

  @ApiProperty({
    description: 'Hora de inicio de la sesión',
    example: '12:30:00',
  })
  @IsNotEmpty({ message: 'endTime es obligatorio.' })
  endTime: string;
}
