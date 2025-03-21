import { PartialType, OmitType } from '@nestjs/swagger';

import { Observation } from './observation.dto';
import { AdmissionProcessDto } from './admission-process.dto';

// DTO identido al modelo de datos
export { Observation, AdmissionProcessDto };

export class AdmissionProcessBaseDto extends OmitType(AdmissionProcessDto, [
  'id',
  'description',
  'createdAt',
] as const) {}

// DTO para crear una observación (sin id)
export class CreateObservationDto extends OmitType(Observation, [
  'id',
] as const) {}

// DTO para crear un área (sin id)
export class CreateAdmissionProcessDto extends OmitType(AdmissionProcessDto, [
  'id',
  'createdAt',
] as const) {}

export class UpdateAdmissionProcessDto extends PartialType(
  OmitType(AdmissionProcessDto, ['id', 'createdAt'] as const),
) {}
