import { OmitType, PartialType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

// Dto con propiedades comunes
export { RoleDto };

// DTO con propiedades comunes o requeridas
export class RoleResponseDto extends OmitType(RoleDto, [] as const) {}

// DTO para crear un rol
export class CreateRoleDto extends OmitType(RoleDto, [
  'id',
  'createdAt',
] as const) {}

// DTO para actualizar un rol
export class UpdateRoleDto extends PartialType(
  OmitType(RoleDto, ['id', 'createdAt'] as const),
) {}
