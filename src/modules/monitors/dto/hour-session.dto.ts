import { IsInt, IsDate } from 'class-validator';

export class HourSessionDto {
  @IsInt()
  id: number;

  @IsInt()
  period: number;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
