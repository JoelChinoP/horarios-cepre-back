import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { permissions } from 'drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PermissionsService {
  private db;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool);
  }

  // Crear un nuevo permiso
  async createPermission(name: string, description?: string) {
    return this.db.insert(permissions).values({ name, description }).returning();
  }

  // Obtener todos los permisos
  async getAllPermissions() {
    return this.db.select().from(permissions);
  }

  async updatePermission(id: number, name: string, description?: string) {
    return this.db
      .update(permissions)
      .set({ name, description })
      .where(eq(permissions.id, id))
      .returning();
  }

  async deletePermission(id: number) {
    return this.db.delete(permissions).where(eq(permissions.id, id)).returning();
  }
}