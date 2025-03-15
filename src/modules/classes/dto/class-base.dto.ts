import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

// DTO base con propiedades comunes
export class ClassBaseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  idSede!: number;

  @IsNotEmpty()
  @IsNumber()
  areaId!: number;

  @IsNotEmpty()
  @IsNumber()
  shiftId!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  capacity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(48)
  urlMeet?: string;
}
