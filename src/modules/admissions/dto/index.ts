import { PartialType, OmitType } from '@nestjs/swagger';

import { Observation } from './observation.dto';
import { AdmissionProcessDto } from './admission-process.dto';

// DTO identido al modelo de datos
export { Observation, AdmissionProcessDto };

// DTO para crear un área (sin id)
export class CreateAdmissionProcessDto extends OmitType(AdmissionProcessDto, [
  'id',
  'createdAt',
] as const) {}
