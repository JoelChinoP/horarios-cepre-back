import { PartialType, OmitType } from '@nestjs/swagger';
import { SedeDto } from './sede.dto';

// DTO base sin ID
export class SedeBaseDto extends OmitType(SedeDto, ['id'] as const) {}

// DTO para crear una sede (sin ID)
export class CreateSedeDto extends SedeBaseDto {}

// DTO para actualizar una sede (sin ID, con propiedades opcionales)
export class UpdateSedeDto extends PartialType(SedeBaseDto) {}
