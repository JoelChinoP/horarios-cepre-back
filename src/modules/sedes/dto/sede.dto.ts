import {
  IsString,
  IsOptional,
  Length,
  Matches,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SedeDto {
  @ApiProperty({
    description: 'ID de la sede',
    example: 1,
  })
  @IsInt({ message: 'El id debe ser un número entero.' })
  @Min(1, { message: 'El id debe ser un número positivo.' })
  id: number;

  @ApiProperty({
    description: 'Nombre de la sede',
    example: 'Sede Central',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(2, 48, { message: 'El nombre debe tener entre 2 y 48 caracteres.' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción de la sede',
    example: 'Sede principal ubicada en el centro de la ciudad.',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Length(0, 255, {
    message: 'La descripción no debe exceder los 255 caracteres.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto de la sede',
    example: '+51 987654321',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto.' })
  @Matches(/^\+?\d{7,20}$/, {
    message:
      'El teléfono debe contener entre 7 y 20 dígitos, con o sin código de país.',
  })
  phone?: string;
}
