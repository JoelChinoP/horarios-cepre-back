import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// DTO base con propiedades comunes
export class AreaBaseDto {
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
