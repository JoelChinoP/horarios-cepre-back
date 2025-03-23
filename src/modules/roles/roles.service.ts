import { Injectable } from '@nestjs/common';
import { DrizzleService } from '@database/drizzle/drizzle.service';
import { eq } from 'drizzle-orm';
import { CreateRoleDto, RoleResponseDto, UpdateRoleDto } from './dto/index';
import { plainToInstance } from 'class-transformer';
import { roles } from '@database/drizzle/schema';

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
    const obj = await this.drizzle.db.query.roles.findMany();
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

  async getAllPermissionsByRolName(name: string) {
    const role = await this.drizzle.db.query.roles.findMany({
      where: (fields) => eq(fields.name, name),
      with: {
        rolePermissions: {
          with: {
            permission: true,
          },
        },
      },
      limit: 1,
    });

    return {
      id: role[0].id,
      name: role[0].name,
      permissions: role[0].rolePermissions.map((rp) => ({
        name: rp.permission.name,
        path: rp.permission.path,
        description: rp.permission.description,
      })),
    };
  }

  // Obtener todos los roles con sus permisos
  async getAllWithPermissions() {
    const rolesData = await this.drizzle.db.query.roles.findMany({
      with: {
        rolePermissions: {
          with: {
            permission: true,
          },
        },
      },
    });

    // Transformar los datos al formato deseado
    return rolesData.map((role) => {
      return {
        id: role.id,
        name: role.name,
        permissions: role.rolePermissions.map((rp) => ({
          name: rp.permission.name,
          path: rp.permission.path,
        })),
      };
    });
  }

  // ─────── METODOS DE APOYO ───────
  private mapToRoleDto(obj: any): RoleResponseDto {
    return plainToInstance(RoleResponseDto, obj);
  }
}
