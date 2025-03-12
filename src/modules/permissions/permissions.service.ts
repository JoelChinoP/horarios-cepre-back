import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { permissions } from 'drizzle/schema';

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
}