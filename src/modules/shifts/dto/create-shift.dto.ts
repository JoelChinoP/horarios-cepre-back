import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  name: string;

  @IsOptional()
  startTime?: Date;

  @IsOptional()
  endTime?: Date;

  @IsInt()
  idSede: number;
}
