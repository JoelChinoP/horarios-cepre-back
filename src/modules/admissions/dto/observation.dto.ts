import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AdmissionProcessDto } from './admission-process.dto';

export class Observation {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  admissionProcessId!: number;

  @IsOptional()
  admission: AdmissionProcessDto;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
