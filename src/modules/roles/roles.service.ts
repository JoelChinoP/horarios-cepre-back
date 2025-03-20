import { Injectable } from '@nestjs/common';
import { DrizzleService } from '@database/drizzle/drizzle.service';
import { permissions, roles, rolesPermissions } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateRoleDto, RoleResponseDto, UpdateRoleDto } from './dto/index';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RolesService {
  constructor(private drizzle: DrizzleService) {}

  // Crear un nuevo rol
  async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    const obj = await this.drizzle.db
      .insert(roles)
      .values(createRoleDto)
      .returning();
    return this.mapToRoleDto(obj);
  }

  // Obtener todos los roles
  async getAll(): Promise<RoleResponseDto[]> {
    const obj = await this.drizzle.db.select().from(roles);
    return obj.map((item) => this.mapToRoleDto(item));
  }

  // Actualizar un rol
  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    const obj = await this.drizzle.db
      .update(roles)
      .set(updateRoleDto)
      .where(eq(roles.id, id))
      .returning();

    return this.mapToRoleDto(obj);
  }

  // Eliminar un rol
  async delete(id: number): Promise<RoleResponseDto> {
    const obj = await this.drizzle.db
      .delete(roles)
      .where(eq(roles.id, id))
      .returning();
    return this.mapToRoleDto(obj);
  }

  async getAllWithPermissions() {
    // Realizar una sola consulta con JOIN para obtener roles y sus permisos
    const rolesWithPermissions = await this.drizzle.db
      .select({
        roleId: roles.id,
        roleName: roles.name,
        permissionId: permissions.id,
        permissionMethod: permissions.methodHttp,
        permissionName: permissions.name,
        permissionPath: permissions.path,
      })
      .from(roles)
      .leftJoin(rolesPermissions, eq(roles.id, rolesPermissions.roleId))
      .leftJoin(permissions, eq(rolesPermissions.permissionId, permissions.id));

    // Agrupar los resultados por rol
    const roleMap = new Map();

    rolesWithPermissions.forEach((item) => {
      const roleId = item.roleId;

      if (!roleMap.has(roleId)) {
        // Crear entrada para este rol si no existe
        const role = {
          id: item.roleId,
          name: item.roleName,
          permissions: [],
        };
        roleMap.set(roleId, this.mapToRoleDto(role));
        roleMap.get(roleId).permissions = [];
      }
      // Agregar el permiso si existe y tiene un ID
      if (item.permissionId) {
        const permission = {
          method_http: item.permissionMethod,
          name: item.permissionName,
          path: item.permissionPath,
        };

        const role = roleMap.get(roleId);
        // Evitar duplicados comprobando si ya existe un permiso con el mismo ID
        if (!role.permissions.some((p) => p.id === item.permissionId)) {
          role.permissions.push(permission);
        }
      }
    });

    // Convertir el mapa a un array
    return Array.from(roleMap.values());
  }

  // ─────── METODOS DE APOYO ───────
  private mapToRoleDto(obj: any): RoleResponseDto {
    return plainToInstance(RoleResponseDto, obj);
  }
}
