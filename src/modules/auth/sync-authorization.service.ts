import { Injectable } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import {
  AUTHORIZATION_METADATA_KEY,
  AuthorizationMetadata,
  Role,
} from './decorators/authorization.decorator';
import { DrizzleService } from '@database/drizzle/drizzle.service';
import { permissions, roles, rolesPermissions } from '@database/drizzle/schema';
//import path from 'path';
interface EndpointMetadata extends AuthorizationMetadata {
  method: string; // HTTP
  path: string; // Full path
}

@Injectable()
export class SyncAuthorizationService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  private httpMethods: { [key: number]: string } = {
    0: 'GET',
    1: 'POST',
    2: 'PUT',
    3: 'DELETE', //4: 'ALL', 5: 'PATCH', 6: 'OPTIONS', 7: 'HEAD',
  };

  // async syncAuthorization() {
  async syncAuthorization() {
    const data = this.getAllEndpointMetadata();

    console.log(data);

    // Extraer todos los roles únicos
    const roleRecords = Object.values(Role).map((role) => ({
      name: role,
      description: `Rol para ${role}`,
    }));

    return await this.drizzleService.db.transaction(async (tx) => {
      // 1. Eliminar datos existentes - usa una sola consulta si es posible con cascada
      await tx.delete(rolesPermissions);
      await tx.delete(permissions);
      await tx.delete(roles);

      // 2. Insertar roles (inserción masiva)
      const insertedRoles = await tx
        .insert(roles)
        .values(roleRecords)
        .returning({
          id: roles.id,
          name: roles.name,
        });

      // Mapa de roles
      const roleIdMap = Object.fromEntries(
        insertedRoles.map((role) => [role.name, role.id]),
      );

      // 3. Insertar permisos (inserción masiva)
      const permissionRecords = data.map((item) => ({
        name: item.permission,
        path: item.path,
        methodHttp: item.method,
        description: item.description,
      }));

      const insertedPermissions = await tx
        .insert(permissions)
        .values(permissionRecords)
        .returning({
          id: permissions.id,
          name: permissions.name,
        });

      // Mapa de permisos
      const permissionIdMap = Object.fromEntries(
        insertedPermissions.map((perm) => [perm.name, perm.id]),
      );

      // 4. Preparar relaciones directamente sin procesar datos innecesariamente
      const relationRecords: { roleId: number; permissionId: number }[] = [];

      // Optimizar la construcción de relationRecords
      for (const endpoint of data) {
        const permId = permissionIdMap[endpoint.permission];
        if (!permId) continue;

        for (const roleName of endpoint.roles ?? []) {
          const roleId = roleIdMap[roleName];
          if (roleId) {
            relationRecords.push({ roleId: roleId, permissionId: permId });
          }
        }
      }

      // Realizar una sola inserción masiva
      if (relationRecords.length > 0) {
        await tx.insert(rolesPermissions).values(relationRecords);
      }

      return {
        data,
        rolesCount: insertedRoles.length,
        permissionsCount: insertedPermissions.length,
        relationsCount: relationRecords.length,
      };
    });
  }

  private getAllEndpointMetadata(): EndpointMetadata[] {
    const endpoints: EndpointMetadata[] = [];
    const controllers = this.discoveryService.getControllers();
    const permissionSet = new Set<string>(); // Usamos un Set para rastrear los permisos únicos

    controllers.forEach((wrapper: InstanceWrapper) => {
      const { instance, metatype } = wrapper;
      if (!instance || !metatype) return;

      const prototype = Object.getPrototypeOf(instance);
      this.metadataScanner
        .getAllMethodNames(prototype)
        .forEach((methodName: string) => {
          const methodHandler = prototype[methodName];

          const controllerPath = this.reflector.get(
            PATH_METADATA,
            instance.constructor,
          );
          const methodPath = this.reflector.get(PATH_METADATA, methodHandler);
          const type = this.reflector.get(METHOD_METADATA, methodHandler);
          const decorator = this.reflector.get(
            AUTHORIZATION_METADATA_KEY,
            methodHandler,
          );

          if (decorator) {
            const { permission } = decorator;
            const fullPath = this.getFullPath(controllerPath, methodPath);

            // Verificamos si el permiso ya existe
            if (permissionSet.has(permission)) {
              throw new Error(`
                Duplicate permission in ${fullPath} found permission: ${permission}`);
            } else {
              permissionSet.add(permission); // Agregamos el permiso al Set
              endpoints.push({
                roles: decorator.roles,
                permission: decorator.permission,
                description: decorator.description,
                path: fullPath,
                method: this.httpMethods[type],
              });
            }
          }
        });
    });

    return endpoints;
  }

  private getFullPath(controllerPath: string, methodPath: string): string {
    const normControllerPath = controllerPath.startsWith('/')
      ? controllerPath
      : `api/${controllerPath}`;
    const normMethodPath = methodPath.startsWith('/')
      ? methodPath
      : `/${methodPath}`;
    // Handle empty method path special case
    if (normMethodPath === '/') {
      return normControllerPath;
    }
    return `${normControllerPath}${normMethodPath}`;
  }
}
