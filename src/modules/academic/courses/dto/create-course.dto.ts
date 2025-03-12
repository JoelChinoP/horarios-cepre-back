import { IsString, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
