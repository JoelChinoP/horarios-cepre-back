import { IsString, IsOptional } from 'class-validator';

export class CreateSedeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
