import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Este endpoint inicia el flujo de autenticación de Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    // Generar JWT para el usuario autenticado
    const jwt = await this.authService.generateJwtToken(req.user);
    
    // Puedes redirigir a una página frontend con el token
    const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${jwt}`;
    return res.redirect(redirectUrl);
  }
}