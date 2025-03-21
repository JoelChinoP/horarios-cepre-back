import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class HourSessionForTeacherDto {
  @Expose()
  @ApiProperty({
    description: 'Hora de inicio de la sesión',
    example: '12:30:00',
  })
  @IsNotEmpty({ message: 'startTime es obligatorio.' })
  startTime: string;

  @Expose()
  @ApiProperty({
    description: 'Hora de fin de la sesión',
    example: '13:10:00',
  })
  @IsNotEmpty({ message: 'endTime es obligatorio.' })
  endTime: string;
}
