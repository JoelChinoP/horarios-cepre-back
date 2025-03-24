import { Injectable } from '@nestjs/common';
import { permissions, roles, rolesPermissions } from '@database/drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { DrizzleService } from '@database/drizzle/drizzle.service';
import {
  CreatePermissionDto,
  PermissionResponseDto,
  UpdatePermissionDto,
} from './dto/index';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PermissionsService {
  constructor(private drizzle: DrizzleService) {}

  // Crear un nuevo permiso
  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    const obj = await this.drizzle.db
      .insert(permissions)
      .values(createPermissionDto)
      .returning();
    return this.mapToPermissionDto(obj);
  }

  // Obtener todos los permisos
  async getAll(): Promise<PermissionResponseDto[]> {
    const obj = await this.drizzle.db.query.permissions.findMany();
    return obj.map((item) => this.mapToPermissionDto(item));
  }

  // Obtener un permiso por ID
  async update(
    id: number,
    UpdatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    const obj = await this.drizzle.db
      .update(permissions)
      .set(UpdatePermissionDto)
      .where(eq(permissions.id, id))
      .returning();

    return this.mapToPermissionDto(obj);
  }

  // Actualizar un permiso
  async delete(id: number): Promise<PermissionResponseDto> {
    const obj = await this.drizzle.db
      .delete(permissions)
      .where(eq(permissions.id, id))
      .returning();
    return this.mapToPermissionDto(obj);
  }

  // ─────── METODOS DE APOYO ───────
  private mapToPermissionDto(obj: any): PermissionResponseDto {
    return plainToInstance(PermissionResponseDto, obj);
  }

  //*** Considerar mejorarlo con REDIS
  async checkPermission(
    roleName: string,
    permissionName: string,
  ): Promise<boolean> {
    const result = await this.drizzle.db
      .select()
      .from(rolesPermissions)
      .innerJoin(roles, eq(rolesPermissions.roleId, roles.id))
      .innerJoin(permissions, eq(rolesPermissions.permissionId, permissions.id))
      .where(
        and(eq(roles.name, roleName), eq(permissions.name, permissionName)),
      )
      .limit(1);

    return result.length > 0;
  }
}
