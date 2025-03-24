import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserProfileForTeacherDto {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;
}
