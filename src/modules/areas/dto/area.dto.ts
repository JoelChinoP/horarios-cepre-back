import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';

// DTO con todas las propiedades
export class AreaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1012 })
  readonly id!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  @ApiProperty({ example: 'Ingenierías' })
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'Área de ingenierías de la universidad' })
  description?: string;
}
