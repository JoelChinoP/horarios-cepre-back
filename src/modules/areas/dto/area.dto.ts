import { AreaBaseDto } from './area-base.dto';
import { IsNumber } from 'class-validator';

// DTO para respuesta que incluye el ID
export class AreaDto extends AreaBaseDto {
  @IsNumber()
  readonly id!: number;
}
