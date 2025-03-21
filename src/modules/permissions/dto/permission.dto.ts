import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';

export class PermissionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  path: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  methodHttp: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}
