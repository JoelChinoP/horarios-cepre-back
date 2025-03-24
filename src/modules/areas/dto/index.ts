import { PartialType, OmitType } from '@nestjs/swagger';

import { AreaDto } from './area.dto';

// DTO identido al modelo de datos
export { AreaDto };

// DTO con propiedades comunes o requeridas
export class AreaBaseDto extends AreaDto {}

// DTO para crear un área (sin id)
export class CreateAreaDto extends OmitType(AreaDto, ['id'] as const) {}

// DTO para actualizar un área (sin id y con campos opcionales)
export class UpdateAreaDto extends PartialType(
  OmitType(AreaDto, ['id'] as const),
) {}
