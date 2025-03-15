import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// DTO base con propiedades comunes
export class AreaBaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
