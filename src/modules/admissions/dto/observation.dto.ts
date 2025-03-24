import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { AdmissionDto } from './admission.dto';

export class ObservationDto {
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
  admission: AdmissionDto;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
