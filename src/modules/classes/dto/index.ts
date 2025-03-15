import { PartialType } from '@nestjs/mapped-types';
import { ClassBaseDto } from './class-base.dto';

// DTO para crear un área
export class CreateClassDto extends ClassBaseDto {}

// DTO para actualizar un área
export class UpdateClassDto extends PartialType(ClassBaseDto) {}

// DTO base con propiedades comunes
export { ClassBaseDto };

// DTO para respuesta que incluye el ID
export { ClassDto } from './class.dto';
