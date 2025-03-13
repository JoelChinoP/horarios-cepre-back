import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateHourSessionDto {
  @IsInt()
  @IsNotEmpty()
  shiftId: number;

  @IsInt()
  @IsNotEmpty()
  period: number;

  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;

  @IsInt()
  durationMinutes?: number;
}
