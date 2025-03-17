import { PartialType, OmitType } from '@nestjs/swagger';

import { AreaDto } from './area.dto';

// DTO con propiedades comunes
export { AreaDto };

// DTO con propiedades comunes o requeridas
export class AreaBaseDto extends OmitType(AreaDto, ['id'] as const) {}

// DTO para crear un área (sin id)
export class CreateAreaDto extends AreaBaseDto {}

// DTO para actualizar un área (sin id y con campos opcionales)
export class UpdateAreaDto extends PartialType(AreaBaseDto) {}
