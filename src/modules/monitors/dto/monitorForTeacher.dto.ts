import { IsOptional } from 'class-validator';
import { SupervisorDto } from '@modules/supervisors/dto';
import { Expose, Transform } from 'class-transformer';
import { UserProfileForTeacherDto } from '@modules/user-profile/dto/user-profile-for-teacher.dto';

// DTO para respuesta que incluye el ID
export class MonitorForTeacherDto {
  @Expose()
  @IsOptional()
  @Transform(({ value }: { value: UserProfileForTeacherDto }) =>
    value ? { firstName: value.firstName, lastName: value.lastName } : null,
  )
  user: { firstName: string; lastName: string } | null;

  @Expose()
  @IsOptional()
  supervisor: SupervisorDto; //CAMBIAR POR DTO A FUTURO
}
