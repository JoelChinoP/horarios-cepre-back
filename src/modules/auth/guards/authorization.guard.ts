import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTHORIZATION_METADATA_KEY,
  AuthorizationMetadata,
  Role,
} from '../decorators/authorization.decorator';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from '@modules/permissions/permissions.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    const metadata = this.reflector.get<AuthorizationMetadata>(
      AUTHORIZATION_METADATA_KEY,
      context.getHandler(),
    );

    if (!metadata || !token) throw new UnauthorizedException();

    try {
      const role = this.jwtService.verify<{ role: Role }>(token).role;

      // Verificar si el rol del usuario tiene permisos para acceder a la ruta y está en el enum Role
      const isRoleValid = Object.values(Role).includes(role);
      if (isRoleValid && metadata.roles.includes(role)) return true;

      // Verificar si el rol del usuario tiene permisos y está en la base de datos
      const hasPermission = await this.permissionsService.checkPermission(
        role,
        metadata.permission,
      );
      if (hasPermission) return true;
    } catch {
      throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}
