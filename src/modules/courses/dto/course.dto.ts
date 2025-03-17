import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseDto {
  @ApiProperty({ description: 'ID del curso', example: 1 })
  @IsInt()
  @Min(1, { message: 'El ID debe ser un número entero positivo.' })
  id: number;

  @ApiProperty({ description: 'Nombre del curso', example: 'Matemáticas' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del curso es obligatorio.' })
  name: string;

  @ApiProperty({
    description: 'Color representativo en formato HEX',
    example: '#FF5733',
  })
  @IsString()
  @IsNotEmpty({ message: 'El color del curso es obligatorio.' })
  color: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso de matemáticas avanzadas',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción del curso es obligatoria.' })
  description: string;
}
