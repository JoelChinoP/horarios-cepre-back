import { PartialType } from '@nestjs/mapped-types';
import { AreaBaseDto } from './area-base.dto';

// DTO para crear un área
export class CreateAreaDto extends AreaBaseDto {}

// DTO para actualizar un área
export class UpdateAreaDto extends PartialType(AreaBaseDto) {}

// DTO para respuesta que incluye el ID
export { AreaDto } from './area.dto';

// DTO base con propiedades comunes
export { AreaBaseDto };
