import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SyncAuthorizationService } from './sync-authorization.service';
import { Unauthenticated } from './decorators/unauthenticated.decorator';

@Controller('auth')
export class AuthController {
  constructor(private syncAuthorizationService: SyncAuthorizationService) {}

  @Unauthenticated() // Evita que se aplique el guard de autorización
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirige al usuario a la pantalla de autenticación de Google
  }

  @Unauthenticated() // Evita que se aplique el guard de autorización
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return req.user;
  }

  @Post('sync-authorizations')
  syncAuthorizations(): any {
    return this.syncAuthorizationService.syncAuthorization();
  }
}
