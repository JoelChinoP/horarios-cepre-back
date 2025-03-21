import { OmitType, PartialType } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';

// Dto con propiedades comunes
export { PermissionDto };

// DTO con propiedades comunes o requeridas
export class PermissionResponseDto extends OmitType(
  PermissionDto,
  [] as const,
) {}

// DTO para crear un área
export class CreatePermissionDto extends OmitType(PermissionDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}

// DTO para actualizar un área
export class UpdatePermissionDto extends PartialType(
  OmitType(PermissionDto, ['id', 'createdAt', 'updatedAt'] as const),
) {}
