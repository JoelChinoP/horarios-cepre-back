import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { roles, rolesPermissions, permissions } from 'drizzle/schema';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class RolesService {
  private db;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool);
  }

  // Crear un nuevo rol
  async createRole(name: string, description?: string) {
    return this.db.insert(roles).values({ name, description }).returning();
  }

  // Asignar un permiso a un rol
  async assignPermissionToRole(roleId: number, permissionId: number) {
    return this.db
      .insert(rolesPermissions)
      .values({ roleId, permissionId })
      .returning();
  }

  // Obtener los permisos de un rol
  async getRolePermissions(roleId: number) {
    return this.db
      .select()
      .from(rolesPermissions)
      .leftJoin(permissions, eq(rolesPermissions.permissionId, permissions.id))
      .where(eq(rolesPermissions.roleId, roleId));
  }

  // Obtener todos los roles
  async getAllRoles() {
    return this.db.select().from(roles);
  }
  //actualizar un rol
  async updateRole(id: number, name: string, description?: string) {
    return this.db
      .update(roles)
      .set({ name, description })
      .where(eq(roles.id, id))
      .returning();
  }
  //eliminar un rol
  async deleteRole(id: number) {
    return this.db.delete(roles).where(eq(roles.id, id)).returning();
  }
  
  // Quitar un permiso de un rol
  async removePermissionFromRole(roleId: number, permissionId: number) {
    return this.db
      .delete(rolesPermissions)
      .where(
        and(
          eq(rolesPermissions.roleId, roleId),
          eq(rolesPermissions.permissionId, permissionId),
        ),
      )
      .returning();
  }
  
}