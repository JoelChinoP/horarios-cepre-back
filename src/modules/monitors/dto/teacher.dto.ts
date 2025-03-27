import { IsString } from 'class-validator';

export class TeacherDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
