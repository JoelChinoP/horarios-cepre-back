import { ClassBaseDto } from './class-base.dto';
import { IsString } from 'class-validator';

// DTO para respuesta que incluye el ID
export class ClassDto extends ClassBaseDto {
  @IsString()
  readonly id!: string;
}
