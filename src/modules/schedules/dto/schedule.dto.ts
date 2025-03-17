import { ScheduleBaseDto } from './schedule-base.dto';
import { IsNumber } from 'class-validator';

// DTO para respuesta que incluye el ID
export class ScheduleDto extends ScheduleBaseDto {
  @IsNumber()
  readonly id!: number;
}
