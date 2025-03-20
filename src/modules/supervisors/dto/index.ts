import {  OmitType, PartialType } from '@nestjs/swagger';
import { SupervisorDto } from './supervisor.dto';

// Exportar el DTO principal
export { SupervisorDto };

export class SupervisorBaseDto extends OmitType(SupervisorDto, [
  'userId',
] as const) {}

export class CreateSupervisorDto extends OmitType(SupervisorDto, [
  'id',
  'user',
] as const) {}

// DTO para actualizar un área
export class UpdateSupervisorDto extends PartialType(
  OmitType(SupervisorDto, ['id', 'user'] as const),
) {}
