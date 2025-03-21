import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthorizationGuard } from './authorization.guard';
import { IS_PUBLIC_KEY } from '../decorators/unauthenticated.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGlobalGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly authorizationGuard: AuthorizationGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificar si la ruta es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // Verificar si el token es válido
    const jwtCanActivate = await this.jwtAuthGuard.canActivate(context);
    if (!jwtCanActivate) return false;

    // Verificar si el usuario tiene permisos para acceder a la ruta
    const authCanActivate = await this.authorizationGuard.canActivate(context);
    return authCanActivate;
  }
}
