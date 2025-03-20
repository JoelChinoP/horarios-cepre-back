import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { User } from '@prisma/client';
import { SupervisorDto } from '@modules/supervisors/dto';

// DTO para respuesta que incluye el ID
export class MonitorForTeacherDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId!: string;

  @IsOptional()
  user: User; //CAMBIAR POR DTO A FUTURO

  @IsOptional()
  supervisor: SupervisorDto; //CAMBIAR POR DTO A FUTURO
}
