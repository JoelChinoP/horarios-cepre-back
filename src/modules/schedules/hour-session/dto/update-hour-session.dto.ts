import { PartialType } from '@nestjs/mapped-types';
import { CreateHourSessionDto } from './create-hour-session.dto';

export class UpdateHourSessionDto extends PartialType(CreateHourSessionDto) {}