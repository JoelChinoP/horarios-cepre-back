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
import { IS_PUBLIC_KEY } from '../decorators/unauthenticated.decorator';
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
    // Verificar si la ruta es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Extraer el token del header de la petición
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    const metadata = this.reflector.get<AuthorizationMetadata>(
      AUTHORIZATION_METADATA_KEY,
      context.getHandler(),
    );
    if (!metadata || !token) throw new UnauthorizedException();

    try {
      const { role } = this.jwtService.decode<{ role: string }>(token);
      // Verificar si el rol del usuario tiene permisos para acceder a la ruta y está en el enum Role
      const isRoleValid = Object.values(Role).includes(role as Role);
      if (isRoleValid && metadata.roles.includes(role as Role)) return true;

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
    const authHeader = request.headers['token'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}
