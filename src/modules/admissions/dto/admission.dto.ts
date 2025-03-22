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
import { PermissionDto } from '@modules/permissions/dto';

export class AdmissionDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

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

  @IsOptional()
  permissions?: PermissionDto[];
}
