import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class ImportTeacherDto {
  @ApiProperty({
    description: 'Correo electrónico del profesor',
    example: 'profesor@ejemplo.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'DNI del profesor',
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({
    description: 'Nombre del profesor',
    example: 'Juan'
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Apellido del profesor',
    example: 'Pérez'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    description: 'Teléfono del profesor',
    example: '987654321'
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Teléfonos adicionales del profesor',
    example: ['987654321', '123456789']
  })
  @IsArray()
  @IsOptional()
  phonesAdditional?: string[];

  @ApiPropertyOptional({
    description: 'Dirección del profesor',
    example: 'Calle Falsa 123'
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico personal del profesor',
    example: 'personal@ejemplo.com'
  })
  @IsEmail()
  @IsOptional()
  personalEmail?: string;

  @ApiProperty({
    description: 'Estado activo del profesor',
    example: true
  })
  @IsBoolean()
  isActive: boolean = true;
}

