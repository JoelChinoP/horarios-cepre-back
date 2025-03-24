import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthResponseDto } from '@modules/auth/dto/auth-google.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateGoogleUser(profile: any): Promise<AuthResponseDto> {
    const email = profile?.emails?.[0]?.value || "cvaldivialu@unsa.edu.pe";
    

    if (!email) {
      throw new UnauthorizedException(
        'No se encontró un correo en el perfil de Google.',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(
        'Acceso no autorizado. Contacta al administrador.',
      );
    }

    const payload = { email: user.email, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
