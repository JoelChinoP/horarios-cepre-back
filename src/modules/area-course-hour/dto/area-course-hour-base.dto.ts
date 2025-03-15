import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

// DTO base con propiedades comunes
export class AreaCourseHourBaseDto {
  @IsNotEmpty()
  @IsNumber()
  areaId!: number;

  @IsNotEmpty()
  @IsNumber()
  courseId!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalHours!: number;
}
