import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AdmissionProcessDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isCurrent: boolean;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
