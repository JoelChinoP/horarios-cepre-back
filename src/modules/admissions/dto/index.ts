import { PartialType, OmitType } from '@nestjs/swagger';

import { ObservationDto } from './observation.dto';
import { AdmissionDto } from './admission.dto';

// DTO identido al modelo de datos
export { ObservationDto, AdmissionDto };

export class AdmissionBaseDto extends OmitType(AdmissionDto, [
  'id',
  'description',
  'createdAt',
] as const) {}

// DTO para crear una observación (sin id)
export class CreateObservationDto extends OmitType(ObservationDto, [
  'id',
] as const) {}

// DTO para crear un área (sin id)
export class CreateAdmissionDto extends OmitType(AdmissionDto, [
  'id',
  'createdAt',
] as const) {}

export class UpdateAdmissionDto extends PartialType(
  OmitType(AdmissionDto, ['id', 'createdAt'] as const),
) {}
