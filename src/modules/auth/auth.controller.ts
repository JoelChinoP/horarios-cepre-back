import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SyncAuthorizationService } from './sync-authorization.service';
import { Unauthenticated } from './decorators/unauthenticated.decorator';
import { AuthService } from './auth.service';
//import { AuthResponseDto } from '@modules/auth/dto/auth-google.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private syncAuthorizationService: SyncAuthorizationService,
    private authService: AuthService,
  ) { }

  @Unauthenticated() // Evita que se aplique el guard de autorización
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirige al usuario a la pantalla de autenticación de Google
  }

  @Unauthenticated() // Evita que se aplique el guard de autorización
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;

    // Generar token
    const authResponse = await this.authService.validateGoogleUser(user);
    const token = authResponse.token;

    // Configurar cookie HTTP-only
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    console.log('Token:', token);

    // Cerrar la ventana de autenticación y refrescar la app principal
    return res.send(`
      <script>
          window.opener.postMessage("auth-success", "http://localhost:5173");
          window.close();
      </script>
  `);
  }

  @Post('sync-authorizations')
  syncAuthorizations(): any {
    return this.syncAuthorizationService.syncAuthorization();
  }
}
